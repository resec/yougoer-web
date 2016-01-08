# coding: UTF-8
from dsl_client import client
import tornado.web
import os.path
from const.us_basic import *


class CollegeBaseHandler(tornado.web.RequestHandler):

    _UNMAPPED_ID = -1
    _SLUG_POOL = {}

    def slug2id(self, slug):
        if slug in self._SLUG_POOL:
            cid = self._SLUG_POOL[slug]
        else:
            try:
                cid = client.submit('UnivSlugTask', {'SLUG': slug})['UNITID']
            except KeyError as ke:
                return self._UNMAPPED_ID

            self._SLUG_POOL[slug] = cid

        return cid


class CollegeHandler(CollegeBaseHandler):

    def get(self, slug):
        param = dict(
            slug=slug
        )

        self.render("college.html", error=None, **param)


class CollegeInfoBasicHandler(CollegeBaseHandler):

    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        names = client.submit('UnivNameTask', dict(UNITID=cid, LANG=['CN','EN']))['rows']

        for n in names:
            if n['LANG'] == 'EN':
                name_local = n['NAME']
            elif n['LANG'] == 'CN':
                name = n['NAME']

        admis = client.submit('UnivEnrolAdmisTask', dict(UNITID=cid))

        acceptance_rate = admis['ADMSSN'] / admis['APPLCN']
        student_amount = admis['EFTOTLT_TOTAL']

        tution = client.submit('UnivTuitionOnCampusTask', dict(UNITID=cid))
        tution_amount_local = tution['CHG3AY3']

        mservice = self.application.settings["media_service"]
        result = dict(cover=self.static_url(mservice.college_cover_src(slug)),
                  logo=self.static_url(mservice.college_logo_src(slug)),
                  name=name,
                  name_local=name_local,
                  acceptance_rate=acceptance_rate,
                  student_amount=student_amount,
                  tution_amount_local=tution_amount_local,
        )

        #print(result)
        self.write(result)


def find_DICT_KEY_LIST(dict_name, org_value):
    if org_value:
        for key, value in dict_name.items():
            v_list = list(range(min(value), max(value)+1))
            if org_value in v_list:
                return key, org_value

    return None, None

def find_DICT_KEY(dict_name, org_value):
    if org_value:
        for key, value in dict_name.items():
            if org_value == value:
                return key, org_value

    return None, None

def find_DICT_COMPARE(dict_name, org_value):
    if org_value:
        if org_value > 115:
            f_dict_v = 1
        elif org_value < 85:
            f_dict_v = 2
        else:
            f_dict_v = 3
        for key, value in dict_name.items():
            if f_dict_v == value:
                return key, org_value

    return None, None

class CollegeInfoIntroductionHandler(CollegeBaseHandler):

    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        intro_infos = client.submit('UnivIntroTask', dict(UNITID=cid))

        EFTOTLT_GR = intro_infos['EFTOTLT_GR']
        EFTOTLT_UNGR = intro_infos['EFTOTLT_UNGR']
        L4GR150 = intro_infos['L4GR150']
        EFTOTLW =intro_infos['EFTOTLW']
        EFTOTLM = intro_infos['EFTOTLM']
        APPLCN = intro_infos['APPLCN']
        ADMSSN = intro_infos['ADMSSN']
        INSTSIZE = intro_infos['INSTSIZE']
        CHG3AY3 = intro_infos['CHG3AY3']
        LOCALE = intro_infos['LOCALE']
        STUFACR = intro_infos['STUFACR']
        LOCATE_V = intro_infos['LOCALE_V']
        INSTSIZE_V = intro_infos['INSTSIZE_V']

        stufacr_label, stufacr_value = find_DICT_KEY_LIST(STUDENTFACULTY, STUFACR)
        tuition_label, tuition_value = find_DICT_KEY_LIST(TUITION, CHG3AY3)
        locate_label, locate_value = find_DICT_KEY_LIST(LOCATE, LOCALE)
        locate_value = LOCATE_V
        insize_label, insize_value = find_DICT_KEY(INSIZE, INSTSIZE)
        insize_value = INSTSIZE_V

        admiss_v = (ADMSSN/APPLCN)*100
        admiss_label, admiss_value = find_DICT_KEY_LIST(ADMISSION, int(admiss_v))
        admiss_value = round((admiss_v), 2)

        guaratedrate_label, guaratedrate_value = find_DICT_KEY(GUARATEDRATE, L4GR150)

        stutype_v = int((EFTOTLT_UNGR/EFTOTLT_GR)*100)
        stutype_label, stutype_value = find_DICT_COMPARE(STUDENTTYPE, stutype_v)
        stutype_value = round((EFTOTLT_UNGR / (EFTOTLT_UNGR + EFTOTLT_GR)), 3) * 100

        gender_v = int((EFTOTLW/EFTOTLM)*100)
        gender_label, gender_value = find_DICT_COMPARE(GENDER, gender_v)
        gender_value = round((EFTOTLW / (EFTOTLW + EFTOTLM)), 3) * 100

        result = {'detail': [
            {"id":1, "label":stufacr_label, "value":stufacr_value},
            {"id":2, "label":tuition_label, "value":tuition_value},
            {"id":3, "label":locate_label, "value":locate_value},
            {"id":4, "label":admiss_label, "value":admiss_value},
            {"id":5, "label":insize_label, "value":insize_value},
            {"id":6, "label":stutype_label, "value":stutype_value},
            {"id":7, "label":gender_label, "value":gender_value},
            {"id":8, "label":guaratedrate_label, "value":guaratedrate_value},
        ]}

        #print(result)
        self.write(result)


def AdmiRequreFormat(dict_name):
    new_dict = {}
    for key, value in dict_name.items():
        if value not in [-2, -1, None]:
            new_key = ADREQ[key]
            new_dict[new_key] = 4 - value
    return new_dict


class CollegeInfoAdmissionHandler(CollegeBaseHandler):
    '''
    录取
    '''
    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        urls = client.submit('UnivAdmiUrlTask', dict(UNITID=cid))
        enrollment = client.submit('UnivEnrolAdmisTask', dict(UNITID=cid))
        requirement = client.submit('UnivAdmiReqTask', dict(UNITID=cid))
        apply_fee = client.submit('UnivAdmiPayTask', dict(UNITID=cid))

        result = {'apply_num': enrollment['APPLCN'],
                  'admiss_num': enrollment['ADMSSN'],
                  'enroll_num': enrollment['ENRLT'],
                  'apply_url': urls['APPLURL'],
                  'requi_url': urls['ADMINURL'],
                  'site_url': urls['WEBADDR'],
                  'apply_fee_under': apply_fee['APPLFEEU'],
                  'apply_fee_gradu': apply_fee['APPLFEEG'],
                  'requirement': AdmiRequreFormat(requirement),
                  }

        self.write(result)


class CollegeInfoTutionHandler(CollegeBaseHandler):
    '''
    费用
    '''

    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        tui_on_campus = client.submit(
            'UnivTuitionOnCampusTask', {'UNITID': cid})
        tui_off_campus = client.submit(
            'UnivTuitionOffCampusTask', {'UNITID': cid})
        tui_compare = client.submit(
            'UnivTuitionCompareTask', {'UNITID': cid})

        tui_on_campus_list = [tui_on_campus['CHG3AY3'], tui_on_campus['CHG4AY3'],
                              tui_on_campus['CHG5AY3'], tui_on_campus['CHG6AY3']]
        tui_off_campus_list = [tui_off_campus['CHG3AY3'], tui_off_campus['CHG4AY3'],
                               tui_off_campus['CHG7AY3'], tui_off_campus['CHG8AY3']]

        tui_campus_label = ['学费', '书杂费', '住宿伙食', '其他费用']
        tui_on_campus_list = [x for x in tui_on_campus_list if x is not None]
        tui_off_campus_list = [x for x in tui_off_campus_list if x is not None]
        tui_on_campus_label = tui_campus_label[:len(tui_on_campus_list)]
        tui_off_campus_label = tui_campus_label[:len(tui_off_campus_list)]

        result = dict(category=["住校学费", "校外学费", "学费对比"],
                      details=[
            [tui_on_campus_label, tui_on_campus_list],
            [tui_off_campus_label, tui_off_campus_list]],
            comparetui=[['本校', '本州', '该地区', '全美'],
                        [tui_on_campus['CHG3AY3'], tui_on_campus['CHG4AY3'],
                         tui_on_campus['CHG5AY3'], tui_on_campus['CHG6AY3']]],
        )

        self.write(result)


class CollegeInfoMajorHandler(CollegeBaseHandler):

    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        amount = client.submit('UnivMajorNumTask', dict(UNITID=cid))['MAJORNUM']
        majors = client.submit('UnivMajorTask', dict(UNITID=cid))['rows']

        lenm = len(majors)
        top = [[], []]
        topn = 8
        labels, counts = top
        for i in range(topn):
            major = majors[lenm - 1 - i]
            labels.append(major['CIPCODE'])
            counts.append(major['CTOTALT'])

        cold = []
        coldn = 3
        for i in range(coldn):
            cold.append(majors[i]['CIPCODE'])

        result = {'amount': amount, 'cold': cold, 'top': top}
        self.write(result)


class CollegeInfoStudentHandler(CollegeBaseHandler):

    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        cats = client.submit('StatiCategoryL3', dict(ID='student'))['rows']
        result = dict(dict=dict(),
                      category=[],
                      detail=[ [[],[],[]] for cat in cats])
        ids = []
        for i, cat in enumerate(cats):
            ids.append(cat['id'])
            result['category'].append(cat['id'])
            detail = result['detail'][i]
            univs = client.submit('StatiUnivTask', dict(UNITID=cid, ID=cat['id'], FIELDS=['AVERAGE']))['rows']
            for univ in univs:
                ids.append(univ['TYPEID1'])
                detail[0].append(univ['TYPEID1'])
                detail[1].append(univ['AVERAGE'])

            states = client.submit('StatiStateTask', dict(UNITID=cid, ID=cat['id'], FIELDS=['AVERAGE']))['rows']
            for states in states:
                detail[2].append(states['AVERAGE'])

        kvs = client.submit('StatiDictValue', dict(IDS=ids))['rows']

        #print(kvs)
        for kv in kvs:
            result['dict'][kv['KEY']] = kv['VALUE']

        self.write(result)



class CollegeInfoLocalHandler(CollegeBaseHandler):
    '''
    位置信息
    '''

    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        local = client.submit('UnivLocateTask', dict(UNITID=cid))
        # EXAMPLE:
        # {'coordinate': [123, 213], 'address': 'Massachusetts Hall Cambridge, Massachusetts 02138', 'telephone': '(617) 495-1000'}
        result = dict(LON=local['LONGITUD'],
                    LAT= local['LATITUDE'],
                    address=local['ADDR'] + ', ' +
                    local['CITY'] + ', ' + local['STABBR'],
                    telephone=local['GENTELE'],
                    )

        self.write(result)


class CollegeInfoRankHandler(CollegeBaseHandler):
    '''
    排名
    '''
    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        rank_type = client.submit('UnivRankTypeTask', dict(UNITID=cid))['rows']
        result = dict(rank=[[],[dict(rank=[[],[]], top=[[],[]]) for t in rank_type]])
        for i, t in enumerate(rank_type):
            result['rank'][0].append(t['RANKTYPE'])
            ranks = client.submit('UnivRankAllTask', dict(UNITID=cid, RANKTYPE=t['RANKTYPE']))['rows']
            tmp = result['rank'][1][i]
            max_year = 0
            for rank in ranks:
                tmp['rank'][0].append(rank['YEAR'])
                tmp['rank'][1].append(rank['RANK'])
                max_year = rank['YEAR']

            sub_ranks = client.submit('UnivSubRankTask', dict(UNITID=cid, RANKTYPE=t['RANKTYPE'], YEAR=max_year))['rows']
            for srank in sub_ranks:
                tmp['top'][0].append(srank['FIELDTYPE'])
                tmp['top'][1].append(srank['RANK'])

        self.write(result)

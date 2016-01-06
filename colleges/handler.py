# coding: UTF-8
from dsl_client import client

import tornado.web

import os.path


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

        result = {'cover': self.static_url('img/college-header-example.jpg'),
                  'logo': self.static_url('img/college-logo-example.png'),
                  'name': '哥伦比亚大学',
                  'name_local': 'Columbia University in the City of New York',
                  'acceptance_rate': 0.074,
                  'student_amount': 26957,
                  'tution_amount': 3000000,
                  'tution_amount_local': 51008,
                  }

        self.write(result)


class CollegeInfoIntroductionHandler(CollegeBaseHandler):

    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        result = {}

        self.write(result)


class CollegeInfoAdmissionHandler(CollegeBaseHandler):

    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        urls = client.submit('UnivAdmiUrlTask', dict(UNITID=cid))
        enrollment = client.submit('UnivEnrolAdmisTask', dict(UNITID=cid))
        requirement = client.submit('UnivAdmiReqTask', dict(UNITID=cid))
        print(requirement)

        result = {'apply_num': enrollment['APPLCN'],
                  'admiss_num': enrollment['ADMSSN'],
                  'enroll_num': enrollment['ENRLT'],
                  'apply_url': urls['APPLURL'],
                  'requi_url': urls['ADMINURL'],
                  'site_url': urls['WEBADDR'],
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

        amount = client.submit('UnivMajorNumTask', dict(UNITID=cid))[
            'MAJORNUM']
        majors = client.submit('UnivMajorTask', dict(UNITID=cid))['rows']

        top = [[], []]
        topn = 10
        labels, counts = top
        for i in range(topn):
            major, count = majors[topn - 1 - i]
            labels.append(major)
            counts.append(count)

        cold = []
        coldn = 3
        for i in range(coldn):
            cold.append(majors[i][0])

        result = {'amount': amount, 'cold': cold, 'top': top}
        print(result)
        self.write(result)


class CollegeInfoStudentHandler(CollegeBaseHandler):

    def get(self, slug):
        cid = self.slug2id(slug)
        '''
        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        enrollment = client.submit('UnivEnrolAdmisTask', dict(UNITID=cid))
        ethnicity = client.submit('UnivEthnicityTask', dict(UNITID=cid))
        ethnicity_state = client.submit(
            'UnivEthnicityStateTask', dict(UNITID=cid))
        gender = client.submit('UnivGenderTask', dict(UNITID=cid))
        gender_state = client.submit('UnivGenderStateTask', dict(UNITID=cid))

        eth_white = ethnicity['EFWHITT']
        eth_black = ethnicity['EFBKAAT']
        eth_asian = ethnicity['EFASIAT']
        eth_other = ethnicity['EFTOTLT_TOTAL'] - \
            eth_white - eth_black - eth_asian
        eth_state_white = eth_state['EFWHITT']
        eth_state_black = eth_state['EFBKAAT']
        eth_state_asian = eth_state['EFASIAT']
        eth_state_other = eth_state['EFTOTLT_TOTAL'] - \
            eth_state_white - eth_state_black - eth_state_asian

        result = dict(category=["人种", "性别"],
                      detail=[[['白人', '黑人', '亚洲人', '其他'],
                               [ethnicity_white, ethnicity_black,
                                   ethnicity_asian, ethnicity_other],
                               [ethnicity_state_white, ethnicity_state_black, ethnicity_state_asian, ethnicity_state_other]],
                              [['男', '女'],
                               [11, 22],
                               [11, 22]]
                              ],
                      enrollment=[['研究生', '本科生', '新生入学'], [enrollment[
                          'EFTOTLT_UNGR'], enrollment['EFTOTLT_GR'], enrollment['ENRLT']]],
                      applicant=35023
                      )

        self.write(result)
        '''


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
        result = dict(coordinate=[local['LONGITUD'], local['LATITUDE']],
                      address=local['ADDR'] + ', ' +
                      local['CITY'] + ', ' + local['STABBR'],
                      telephone=local['GENTELE'],
                      )

        self.write(result)


class CollegeInfoRankHandler(CollegeBaseHandler):

    def get(self, slug):
        cid = self.slug2id(slug)

        if cid == self._UNMAPPED_ID:
            self.write('error slug')

        rank_type = [t[0] for t in client.submit(
            'UnivRankTypeTask', dict(UNITID=cid))['rows']]
        result = dict(
            rank=[[], [dict(rank=[[], []], top=[[], []]) for t in rank_type]])
        for i, t in enumerate(rank_type):
            result['rank'][0].append(t)
            ranks = client.submit('UnivRankAllTask', dict(
                UNITID=cid, RANKTYPE=t))['rows']
            tmp = result['rank'][1][i]
            max_year = 0
            for rank, year in ranks:
                tmp['rank'][0].append(year)
                tmp['rank'][1].append(rank)
                max_year = year

            sub_ranks = client.submit('UnivSubRankTask', dict(
                UNITID=cid, RANKTYPE=t, YEAR=max_year))['rows']
            for sub_rank, label in sub_ranks:
                tmp['top'][0].append(label)
                tmp['top'][1].append(sub_rank)

        self.write(result)

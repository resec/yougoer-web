# coding: UTF-8
from dsl_client import client

import tornado.web

import os.path

_SLUG_POOL = {}

class CollegeBaseHandler(tornado.web.RequestHandler):


    _UNMAPPED_ID = -1


    def slug2id(self, slug):
        if slug in _SLUG_POOL:
            id = _SLUG_POOL[slug]
        else:
            try:
                id = client.submit('CollegeSlugTask', {'SLUG':slug})['UNITID']
            except KeyError as ke:
                return self._UNMAPPED_ID

            _SLUG_POOL[slug] = id

        return id


class CollegeInfoHandler(CollegeBaseHandler):


    def get(self, slug):
        id = self.slug2id(slug)

        if id == self._UNMAPPED_ID:
            self.write('error: college not found!')
            return

        mservice = self.application.settings["media_service"]
        param = dict(
            college_name=client.submit('CollegeNameTask', {'UNITID':id})['NAME'],
            college_index=slug,
            cover_src=mservice.college_cover_src(slug),
            logo_src=mservice.college_logo_src(slug, mservice.SIZE_COLLEGE_LOGO_BIG)
        )

        self.render("college/index.html", error=None, **param)


class CollegeInfoSharpHandler(CollegeBaseHandler):


    def get(self, slug):
        id = self.slug2id(slug)

        if id == self._UNMAPPED_ID:
            self.write('error: college not found!')
            return

        mservice = self.application.settings["media_service"]
        result = dict(
            college_name=client.submit('CollegeNameTask', {'UNITID':id})['NAME'],
            logo_small=mservice.college_logo_src(slug, mservice.SIZE_COLLEGE_LOGO_SMALL),
            logo_middle=mservice.college_logo_src(slug, mservice.SIZE_COLLEGE_LOGO_MIDDLE),
            logo_big=mservice.college_logo_src(slug, mservice.SIZE_COLLEGE_LOGO_BIG)
        )

        self.write(result)


class CollegeInfoMultipleSharpHandler(CollegeBaseHandler):


    def get(self):
        slugs_str = self.get_argument('slugs', None)

        if slugs_str is None:
            self.write(dict(error="slugs is not existed"))
            return

        slugs = slugs_str.split('|')

        id_list = set()
        for slug in slugs:
            id = self.slug2id(slug)
            if id == self._UNMAPPED_ID:
                return self.write(dict(error="unrecognized slug %s" % slug))
            id_list.add((id, slug))

        results = dict(sharps=list())
        mservice = self.application.settings["media_service"]

        for id, slug in id_list:
            result = dict(
                college_name=client.submit('CollegeNameTask', {'UNITID':id})['NAME'],
                logo_small=mservice.college_logo_src(slug, mservice.SIZE_COLLEGE_LOGO_SMALL),
                logo_middle=mservice.college_logo_src(slug, mservice.SIZE_COLLEGE_LOGO_MIDDLE),
                logo_big=mservice.college_logo_src(slug, mservice.SIZE_COLLEGE_LOGO_BIG)
            )

            results['sharps'].append(result)

        self.write(results)


class CollegeCompareDetailHandler(CollegeBaseHandler):

    _type_task_map = {
        'cp':'CollegeCompareTask',
        'rr':'CollegeRankTask'
    }

    def get(self):
        slugs_str = self.get_argument('slugs', None)

        if slugs_str is None:
            self.write(dict(error="slugs is not existed"))
            return

        slugs = slugs_str.split('|')

        if len(slugs) < 2:
            return self.write(dict(error="slug list has too little items"))

        id_list = set()
        for slug in slugs:
            id = self.slug2id(slug)
            if id == self._UNMAPPED_ID:
                return self.write(dict(error="unrecognized slug %s" % slug))

            id_list.add(self.slug2id(slug))

        detail_type = self.get_argument('type', None)

        if detail_type is None or detail_type not in self._type_task_map:
            return self.write(dict(error='unrecognized detail type!'))

        if detail_type == 'rr':
            rank_type = self.get_argument('rank_type', None)
            if rank_type is None:
                return self.write(dict(error='rank type is not specified!'))

            field_type = self.get_argument('field_type', None)
            if field_type is None:
                return self.write(dict(error='field type is not specified!'))

        task = self._type_task_map[detail_type]
        param = {'UNITID':id}
        if detail_type == 'rr':
            param['TYPE'] = rank_type
            param['FIELD_TYPE'] = field_type

        result = dict(infos=list())
        for id in id_list:
            result['infos'].append(client.submit(task, param))

        return self.write(result)


class CollegeCompareHandler(CollegeBaseHandler):


    def get(self):
        slugs_str = self.get_argument('slugs', None)

        if slugs_str is None:
            self.write(dict(error="slugs is not existed"))
            return

        slugs = slugs_str.split('|')

        if len(slugs) < 2:
            return self.write(dict(error="slug list has too little items"))

        id_list = set()
        for slug in slugs:
            id = self.slug2id(slug)
            if id == self._UNMAPPED_ID:
                return self.write(dict(error="unrecognized slug %s" % slug))

            id_list.add(self.slug2id(slug))

        param=dict(college_indexes='|'.join(slugs))

        return self.render("college/compare.html", error=None, **param)


class CollegeInfoDetailHandler(CollegeBaseHandler):


    _type_task_map = {
        'ff':'CollegeFastFactsTask',
        'ai':'CollegeAdmiInfoTask',
        'si':'CollegeStuInfoKFTask',
        'si_eth':'CollegeStuInfoETHTask',
        'tui':'CollegeTuiFeeUnTask',
        'rr':'CollegeRankTask'
    }


    def get(self, slug):
        result = None

        id = self.slug2id(slug)
        if id == self._UNMAPPED_ID:
            result = dict(error='college not found!')

        detail_type = self.get_argument('type', None)

        if detail_type is None or detail_type not in self._type_task_map:
            result = dict(error='unrecognized detail type!')

        if detail_type == 'rr':
            rank_type = self.get_argument('rank_type', None)
            if rank_type is None:
                result = dict(error='rank type is not specified!')

            field_type = self.get_argument('field_type', None)
            if field_type is None:
                result = dict(error='field type is not specified!')

        if result is None:
            task = self._type_task_map[detail_type]

            param = {'UNITID':id}
            if detail_type == 'rr':
                param['TYPE'] = rank_type
                param['FIELD_TYPE'] = field_type

            result = client.submit(task, param)
        
        self.write(result)


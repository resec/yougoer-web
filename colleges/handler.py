# coding: UTF-8
from dsl_client import client

import tornado.web

import os.path


class CollegeBaseHandler(tornado.web.RequestHandler):


    _UNMAPPED_ID = -1
    _SLUG_POOL = {}

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


class CollegeHandler(CollegeBaseHandler):


    def get(self, slug):
        mservice = self.application.settings["media_service"]
        param = dict(
            slug=slug
        )

        self.render("college.html", error=None, **param)


class CollegeInfoBasicHandler(CollegeBaseHandler):


    def get(self, slug):
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
        result = {}
        
        self.write(result)
    
class CollegeInfoAdmissionHandler(CollegeBaseHandler):


    def get(self, slug):
        result = {'application': 1655, 'admission': 655, 'acceptance_rate': 0.06, 'enrollment': 655, 'application_url': 'www.yougoer.com/apply', 'requirement_url': 'www.yougoer.com/require'}
        
        self.write(result)

class CollegeInfoTutionHandler(CollegeBaseHandler):


    def get(self, slug):
        result = {'fee':[['学费', '水电费', '交通费', '伙食费'], [1200, 300, 200, 900]],'application':[['学士','硕士或以上'],[300, 350]]}
        
        self.write(result)

class CollegeInfoMajorHandler(CollegeBaseHandler):


    def get(self, slug):
        result = {'amount': 38, 'cold': ['Science Social Sciences', 'History', 'Economics'], 'top': [['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]}
        
        self.write(result)

class CollegeInfoStudentHandler(CollegeBaseHandler):


    def get(self, slug):
        result = {
                        'category':['人种', '性别'],
                        'detail': [[['白人', '黑人', '亚洲人', '其他'], [33, 22, 33, 22], [33, 22, 33, 22]], [['男', '女', '未知'], [11, 22, 33], [11, 22, 33]]],
                        'enrollment': [['Graduates', 'Undergraduates', 'Enrolled Freshmen'], [30000, 20000, 1000]],
                        'applicant': 35023
                        }
        
        self.write(result)

class CollegeInfoLocalHandler(CollegeBaseHandler):


    def get(self, slug):
        result = {'coordinate': [123, 213], 'address': 'Massachusetts Hall Cambridge, Massachusetts 02138', 'telephone': '(617) 495-1000'}
        
        self.write(result)
    
class CollegeInfoRankHandler(CollegeBaseHandler):


    def get(self, slug):
        result = {'rank': [
                ['USnews', 'QS', '世界学术', 'TIMES'],
                [{
                    'rank': [[2009, 2010, 2011, 2012, 2013, 2014, 2015], [1, 2, 3, 4, 5, 6, 7]],
                    'top':[['商科', '计算机', '电子'], [123, 22, 88]]
                },
                    {
                    'rank': [[2009, 2010, 2011, 2013, 2014, 2015], [1, 2, 3, 5, 6, 7]],
                    'top':[['计算机', '电子', '商科'], [432, 11, 77]]
                },
                    {
                    'rank': [[2009, 2010, 2011, 2012, 2013, 2014, 2015], [10, 21, 11, 12, 15, 16, 12]],
                    'top':[['电子', '计算机', '商科'], [23, 22, 66]]
                },
                    {
                    'rank': [[2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015], [6, 10, 2, 4, 3, 5, 6, 7, 10]],
                    'top':[['电子', '商科', '计算机'], [123, 33, 55]]
                }]
            ]
            }
        
        self.write(result)
    
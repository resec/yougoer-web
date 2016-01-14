# coding: UTF-8
import handler
from colleges import handler as handler_college

handlers_list = [
    #(r"/", HomeHandler),
    #(r"/login", LoginHandler),
    #(r"/register", RegisterHandler),
    #(r"/logout", LogoutHandler),
    #(r"/college", handler_college.CollegeHandler),
    #(r"/college/sharp", handler_college.CollegeInfoMultipleSharpHandler),
    #(r"/college/compare", handler_college.CollegeCompareHandler),
    #(r"/college/compare/detail", handler_college.CollegeCompareDetailHandler),
    (r"/college/map", handler_college.CollegeMapHandler),
    (r"/college/(?P<slug>[^/]+)", handler_college.CollegeHandler),
    (r"/college/(?P<slug>[^/]+)/info/basic", handler_college.CollegeInfoBasicHandler),
    (r"/college/(?P<slug>[^/]+)/info/introduction", handler_college.CollegeInfoIntroductionHandler),
    (r"/college/(?P<slug>[^/]+)/info/rank", handler_college.CollegeInfoRankHandler),
    (r"/college/(?P<slug>[^/]+)/info/admission", handler_college.CollegeInfoAdmissionHandler),
    (r"/college/(?P<slug>[^/]+)/info/tution", handler_college.CollegeInfoTutionHandler),
    (r"/college/(?P<slug>[^/]+)/info/major", handler_college.CollegeInfoMajorHandler),
    (r"/college/(?P<slug>[^/]+)/info/student", handler_college.CollegeInfoStudentHandler),
    (r"/college/(?P<slug>[^/]+)/info/local", handler_college.CollegeInfoLocalHandler),
    #(r"/college/(?P<slug>[^/]+)/sharp", handler_college.CollegeInfoSharpHandler),
    #(r"/college/(?P<id>\d+)/r/(?P<rank_type>\w+)/(?P<field_type>\w+)", handler_college.CollegeDetailTRankHandler),
]

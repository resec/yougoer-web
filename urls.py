# coding: UTF-8
import handler
from colleges import handler as handler_college

handlers_list = [
    #(r"/", HomeHandler),
    #(r"/login", LoginHandler),
    #(r"/register", RegisterHandler),
    #(r"/logout", LogoutHandler),
    #(r"/college", handler_college.CollegeHandler),
    (r"/college/sharp", handler_college.CollegeInfoMultipleSharpHandler),
    (r"/college/compare", handler_college.CollegeCompareHandler),
    (r"/college/compare/detail", handler_college.CollegeCompareDetailHandler),
    (r"/college/(?P<slug>[^/]+)", handler_college.CollegeInfoHandler),
    (r"/college/(?P<slug>[^/]+)/detail", handler_college.CollegeInfoDetailHandler),
    (r"/college/(?P<slug>[^/]+)/sharp", handler_college.CollegeInfoSharpHandler),
    #(r"/college/(?P<id>\d+)/r/(?P<rank_type>\w+)/(?P<field_type>\w+)", handler_college.CollegeDetailTRankHandler),
]

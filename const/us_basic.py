LOCATE = {
    '公共交通非常发达': [11, 12],
    '公共交通发达': [13, 21],
    '公共交通一般': [22, 23, 31],
    '公共交通欠缺': [32, 33, 41],
    '公共交通差': [42, 43],
}

INSIZE = {
    '学校规模小': 1,
    '学校规模偏小': 2,
    '学校规模正常': 3,
    '学校规模大': 4,
    '学校规模很大': 5,
}

GENDER = {
    '男女比例和谐': 3,
    '男生偏多': 2,
    '女性偏多': 1,
}

GUARATEDRATE = {
    '毕业率非常高': [80, 100],
    '毕业率高': [70, 79],
    '毕业率一般': [60, 69],
    '毕业率低': [40, 59],
    '毕业率非常低': [0, 39],
}

STUDENTFACULTY = {
    '师生比例很好': [1, 8],
    '师生比例好': [9, 12],
    '师生比例较好': [13, 16],
    '师生比例一般': [17, 20],
    '师生比例较差': [22, 40],
    '师生比例差': [40, 400],
}

STUDENTTYPE = {
    "学生比例平均": 3,
    "本科生为主": 1,
    "研究生为主": 2,
}

ADMISSION = {
    "超难被录取": [0, 10],
    "很难被录取": [11, 40],
    "难被录取": [41, 75],
    "容易被录取": [75, 89],
    "非常容易被录取": [90, 100],
}

TUITION = {
    "费用很低": [0, 6248],
    "费用偏低": [6249, 14354],
    "费用正常": [14355, 18354],
    "费用偏高": [18355, 24816],
    "费用高昂": [24817, 100000],
}

ADREQ = {
    "ADMCON1": "GPA 绩点",
    "ADMCON2": "在校排名",
    "ADMCON3": "在校成绩单",
    "ADMCON5": "推荐信",
    "ADMCON7": "入学考试成绩",
    "ADMCON8": "TOEFL 成绩",
}

import os
import os.path


_DEFAULT_COLLEGE_IMAGE_PATH = 'media/college/image'
_DEFAULT_COLLEGE_LOGO_PATH = _DEFAULT_COLLEGE_IMAGE_PATH + '/default/logo/200x_logo'
_DEFAULT_COLLEGE_COVER_PATH = _DEFAULT_COLLEGE_IMAGE_PATH + '/default/cover/cover'

SIZE_COLLEGE_LOGO_SMALL = 1
SIZE_COLLEGE_LOGO_MIDDLE = 2
SIZE_COLLEGE_LOGO_BIG = 3

class MediaService(object):


    SIZE_COLLEGE_LOGO_SMALL = SIZE_COLLEGE_LOGO_SMALL
    SIZE_COLLEGE_LOGO_MIDDLE = SIZE_COLLEGE_LOGO_MIDDLE
    SIZE_COLLEGE_LOGO_BIG = SIZE_COLLEGE_LOGO_BIG

    _COLLEGE_LOGO_SIZE_MAP = {
        SIZE_COLLEGE_LOGO_SMALL:'45x',
        SIZE_COLLEGE_LOGO_MIDDLE:'80x',
        SIZE_COLLEGE_LOGO_BIG:'200x',
    }


    def __init__(self, media_src):
        self.media_src = media_src
        self.college_image_src = os.path.join(media_src, 'college', 'image')


    def college_logo_src(self, slug, size=SIZE_COLLEGE_LOGO_BIG):
        logo_size = self._COLLEGE_LOGO_SIZE_MAP[size]
        logo_name = os.path.join(slug, 'logo', logo_size + '_logo')
        logo_path = os.path.join(_DEFAULT_COLLEGE_IMAGE_PATH, logo_name)
        if not os.path.exists(os.path.join(self.college_image_src, logo_name)):
            logo_path = _DEFAULT_COLLEGE_LOGO_PATH

        return logo_path


    def college_cover_src(self, slug):
        cover_name = os.path.join(slug, 'cover', 'cover')
        cover_path = os.path.join(_DEFAULT_COLLEGE_IMAGE_PATH, cover_name)
        if not os.path.exists(os.path.join(self.college_image_src, cover_name)):
            cover_path = _DEFAULT_COLLEGE_COVER_PATH

        return cover_path

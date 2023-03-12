from rest_framework import routers
from Api.v1.FormLinks.views import FormLinksViewSet

router = routers.DefaultRouter()
router.register(r'form-links', FormLinksViewSet, basename='form-links')

urlpatterns = router.urls

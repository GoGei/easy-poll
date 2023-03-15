from django.conf.urls import url
from . import views

urlpatterns = [
    url('^$', views.home_index, name='index'),

    url('^new-year-poll-2022-2023/$', views.new_year_poll_2022_2023, name='new-year-poll-2022-2023'),
    url('^after-new-year-poll-2022-2023/$', views.after_new_year_poll_2022_2023, name='after-new-year-poll-2022-2023'),
    url('^next-meet-preference/$', views.next_meet_preference, name='next-meet-preference'),
    url('^assassins-creed-3-game-pall/$', views.assassins_creed_3_game_pall, name='assassins-creed-3-game-pall'),
    url('^hell-neighbour-game-pall/$', views.hell_neighbour_game_pall, name='hell-neighbour-game-pall'),
    url('^saint-valentine-day-2023-pall/$', views.saint_valentine_day_2023_pall, name='saint-valentine-day-2023-pall'),
    url('^other-poll-preferences-poll/$', views.other_poll_preferences_poll, name='other-poll-preferences-poll'),
    url('^after-meet-poll/$', views.after_meet_poll, name='after-meet-poll'),
]

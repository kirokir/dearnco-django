# Bughunt Report

## File Tree

```
dearnco-django
├── agency
│   ├── migrations
│   │   ├── 0001_initial.py
│   │   ├── 0002_bentogriditem_brochure_chatbotqa.py
│   │   ├── 0003_strategycalllead_interest_strategycalllead_message.py
│   │   ├── 0004_alter_strategycalllead_biggest_challenge_and_more.py
│   │   └── __init__.py
│   ├── templates
│   │   └── agency
│   │       ├── about.html
│   │       └── join_us.html
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── blog
│   ├── migrations
│   │   ├── 0001_initial.py
│   │   ├── 0002_alter_blogpost_author.py
│   │   ├── 0003_alter_blogpost_header_image_and_more.py
│   │   ├── 0004_alter_blogpost_is_featured.py
│   │   └── __init__.py
│   ├── templates
│   │   └── blog
│   │       ├── blog_index.html
│   │       └── blog_post_detail.html
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── core
│   ├── management
│   │   ├── commands
│   │   │   ├── __init__.py
│   │   │   ├── createsu.py
│   │   │   ├── ensure_profiles.py
│   │   │   └── resetadminpass.py
│   │   └── __init__.py
│   ├── migrations
│   │   ├── 0001_initial.py
│   │   └── __init__.py
│   ├── templates
│   │   ├── core
│   │   │   ├── breadcrumbs.html
│   │   │   ├── contact.html
│   │   │   ├── faq.html
│   │   │   ├── privacy.html
│   │   │   └── terms.html
│   │   ├── base.html
│   │   └── home.html
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── signals.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── dearco_portfolio
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── doc
│   ├── bug_report.md
│   ├── changes.md
│   ├── github_context.md
│   ├── implementation_plan.md
│   ├── project_architecture.md
│   └── walkthrough.md
├── portfolio
│   ├── migrations
│   │   ├── 0001_initial.py
│   │   └── __init__.py
│   ├── templates
│   │   └── portfolio
│   │       ├── portfolio_all.html
│   │       └── team.html
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── site_settings
│   ├── migrations
│   │   ├── 0001_initial.py
│   │   └── __init__.py
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── context_processors.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── static
│   ├── css
│   │   └── main.css
│   ├── img
│   │   ├── favicon.png
│   │   ├── icon-192x192.png
│   │   ├── icon-512x512.png
│   │   └── mole.svg
│   ├── js
│   │   └── main.js
│   └── manifest.json
├── staticfiles
│   ├── admin
│   │   ├── css
│   │   │   ├── vendor
│   │   │   │   └── select2
│   │   │   │       ├── LICENSE-SELECT2.f94142512c91.md
│   │   │   │       ├── LICENSE-SELECT2.f94142512c91.md.gz
│   │   │   │       ├── LICENSE-SELECT2.md
│   │   │   │       ├── LICENSE-SELECT2.md.gz
│   │   │   │       ├── select2.a2194c262648.css
│   │   │   │       ├── select2.a2194c262648.css.gz
│   │   │   │       ├── select2.css
│   │   │   │       ├── select2.css.gz
│   │   │   │       ├── select2.min.9f54e6414f87.css
│   │   │   │       ├── select2.min.9f54e6414f87.css.gz
│   │   │   │       ├── select2.min.css
│   │   │   │       └── select2.min.css.gz
│   │   │   ├── autocomplete.4a81fc4242d0.css
│   │   │   ├── autocomplete.4a81fc4242d0.css.gz
│   │   │   ├── autocomplete.css
│   │   │   ├── autocomplete.css.gz
│   │   │   ├── base.9f65b5cd54b3.css
│   │   │   ├── base.9f65b5cd54b3.css.gz
│   │   │   ├── base.css
│   │   │   ├── base.css.gz
│   │   │   ├── changelists.47cb433b29d4.css
│   │   │   ├── changelists.47cb433b29d4.css.gz
│   │   │   ├── changelists.css
│   │   │   ├── changelists.css.gz
│   │   │   ├── dark_mode.css
│   │   │   ├── dark_mode.css.gz
│   │   │   ├── dark_mode.e18e9a052429.css
│   │   │   ├── dark_mode.e18e9a052429.css.gz
│   │   │   ├── dashboard.css
│   │   │   ├── dashboard.css.gz
│   │   │   ├── dashboard.e90f2068217b.css
│   │   │   ├── dashboard.e90f2068217b.css.gz
│   │   │   ├── forms.b29a0c8c9155.css
│   │   │   ├── forms.b29a0c8c9155.css.gz
│   │   │   ├── forms.css
│   │   │   ├── forms.css.gz
│   │   │   ├── login.586129c60a93.css
│   │   │   ├── login.586129c60a93.css.gz
│   │   │   ├── login.css
│   │   │   ├── login.css.gz
│   │   │   ├── nav_sidebar.css
│   │   │   ├── nav_sidebar.css.gz
│   │   │   ├── nav_sidebar.dd925738f4cc.css
│   │   │   ├── nav_sidebar.dd925738f4cc.css.gz
│   │   │   ├── responsive.css
│   │   │   ├── responsive.css.gz
│   │   │   ├── responsive.eafb93ff084c.css
│   │   │   ├── responsive.eafb93ff084c.css.gz
│   │   │   ├── responsive_rtl.7d1130848605.css
│   │   │   ├── responsive_rtl.7d1130848605.css.gz
│   │   │   ├── responsive_rtl.css
│   │   │   ├── responsive_rtl.css.gz
│   │   │   ├── rtl.aa92d763340b.css
│   │   │   ├── rtl.aa92d763340b.css.gz
│   │   │   ├── rtl.css
│   │   │   ├── rtl.css.gz
│   │   │   ├── widgets.8a70ea6d8850.css
│   │   │   ├── widgets.8a70ea6d8850.css.gz
│   │   │   ├── widgets.css
│   │   │   └── widgets.css.gz
│   │   ├── img
│   │   │   ├── gis
│   │   │   │   ├── move_vertex_off.7a23bf31ef8a.svg
│   │   │   │   ├── move_vertex_off.7a23bf31ef8a.svg.gz
│   │   │   │   ├── move_vertex_off.svg
│   │   │   │   ├── move_vertex_off.svg.gz
│   │   │   │   ├── move_vertex_on.0047eba25b67.svg
│   │   │   │   ├── move_vertex_on.0047eba25b67.svg.gz
│   │   │   │   ├── move_vertex_on.svg
│   │   │   │   └── move_vertex_on.svg.gz
│   │   │   ├── calendar-icons.39b290681a8b.svg
│   │   │   ├── calendar-icons.39b290681a8b.svg.gz
│   │   │   ├── calendar-icons.svg
│   │   │   ├── calendar-icons.svg.gz
│   │   │   ├── icon-addlink.d519b3bab011.svg
│   │   │   ├── icon-addlink.d519b3bab011.svg.gz
│   │   │   ├── icon-addlink.svg
│   │   │   ├── icon-addlink.svg.gz
│   │   │   ├── icon-alert.034cc7d8a67f.svg
│   │   │   ├── icon-alert.034cc7d8a67f.svg.gz
│   │   │   ├── icon-alert.svg
│   │   │   ├── icon-alert.svg.gz
│   │   │   ├── icon-calendar.ac7aea671bea.svg
│   │   │   ├── icon-calendar.ac7aea671bea.svg.gz
│   │   │   ├── icon-calendar.svg
│   │   │   ├── icon-calendar.svg.gz
│   │   │   ├── icon-changelink.18d2fd706348.svg
│   │   │   ├── icon-changelink.18d2fd706348.svg.gz
│   │   │   ├── icon-changelink.svg
│   │   │   ├── icon-changelink.svg.gz
│   │   │   ├── icon-clock.e1d4dfac3f2b.svg
│   │   │   ├── icon-clock.e1d4dfac3f2b.svg.gz
│   │   │   ├── icon-clock.svg
│   │   │   ├── icon-clock.svg.gz
│   │   │   ├── icon-deletelink.564ef9dc3854.svg
│   │   │   ├── icon-deletelink.564ef9dc3854.svg.gz
│   │   │   ├── icon-deletelink.svg
│   │   │   ├── icon-deletelink.svg.gz
│   │   │   ├── icon-hidelink.8d245a995e18.svg
│   │   │   ├── icon-hidelink.8d245a995e18.svg.gz
│   │   │   ├── icon-hidelink.svg
│   │   │   ├── icon-hidelink.svg.gz
│   │   │   ├── icon-no.439e821418cd.svg
│   │   │   ├── icon-no.439e821418cd.svg.gz
│   │   │   ├── icon-no.svg
│   │   │   ├── icon-no.svg.gz
│   │   │   ├── icon-unknown-alt.81536e128bb6.svg
│   │   │   ├── icon-unknown-alt.81536e128bb6.svg.gz
│   │   │   ├── icon-unknown-alt.svg
│   │   │   ├── icon-unknown-alt.svg.gz
│   │   │   ├── icon-unknown.a18cb4398978.svg
│   │   │   ├── icon-unknown.a18cb4398978.svg.gz
│   │   │   ├── icon-unknown.svg
│   │   │   ├── icon-unknown.svg.gz
│   │   │   ├── icon-viewlink.41eb31f7826e.svg
│   │   │   ├── icon-viewlink.41eb31f7826e.svg.gz
│   │   │   ├── icon-viewlink.svg
│   │   │   ├── icon-viewlink.svg.gz
│   │   │   ├── icon-yes.d2f9f035226a.svg
│   │   │   ├── icon-yes.d2f9f035226a.svg.gz
│   │   │   ├── icon-yes.svg
│   │   │   ├── icon-yes.svg.gz
│   │   │   ├── inline-delete.fec1b761f254.svg
│   │   │   ├── inline-delete.fec1b761f254.svg.gz
│   │   │   ├── inline-delete.svg
│   │   │   ├── inline-delete.svg.gz
│   │   │   ├── LICENSE
│   │   │   ├── LICENSE.2c54f4e1ca1c
│   │   │   ├── LICENSE.2c54f4e1ca1c.gz
│   │   │   ├── LICENSE.gz
│   │   │   ├── README.a70711a38d87.txt
│   │   │   ├── README.a70711a38d87.txt.gz
│   │   │   ├── README.txt
│   │   │   ├── README.txt.gz
│   │   │   ├── search.7cf54ff789c6.svg
│   │   │   ├── search.7cf54ff789c6.svg.gz
│   │   │   ├── search.svg
│   │   │   ├── search.svg.gz
│   │   │   ├── selector-icons.b4555096cea2.svg
│   │   │   ├── selector-icons.b4555096cea2.svg.gz
│   │   │   ├── selector-icons.svg
│   │   │   ├── selector-icons.svg.gz
│   │   │   ├── sorting-icons.3a097b59f104.svg
│   │   │   ├── sorting-icons.3a097b59f104.svg.gz
│   │   │   ├── sorting-icons.svg
│   │   │   ├── sorting-icons.svg.gz
│   │   │   ├── tooltag-add.e59d620a9742.svg
│   │   │   ├── tooltag-add.e59d620a9742.svg.gz
│   │   │   ├── tooltag-add.svg
│   │   │   ├── tooltag-add.svg.gz
│   │   │   ├── tooltag-arrowright.bbfb788a849e.svg
│   │   │   ├── tooltag-arrowright.bbfb788a849e.svg.gz
│   │   │   ├── tooltag-arrowright.svg
│   │   │   └── tooltag-arrowright.svg.gz
│   │   └── js
│   │       ├── admin
│   │       │   ├── DateTimeShortcuts.9f6e209cebca.js
│   │       │   ├── DateTimeShortcuts.9f6e209cebca.js.gz
│   │       │   ├── DateTimeShortcuts.js
│   │       │   ├── DateTimeShortcuts.js.gz
│   │       │   ├── RelatedObjectLookups.ef211845e458.js
│   │       │   ├── RelatedObjectLookups.ef211845e458.js.gz
│   │       │   ├── RelatedObjectLookups.js
│   │       │   └── RelatedObjectLookups.js.gz
│   │       ├── vendor
│   │       │   ├── jquery
│   │       │   │   ├── jquery.12e87d2f3a4c.js
│   │       │   │   ├── jquery.12e87d2f3a4c.js.gz
│   │       │   │   ├── jquery.js
│   │       │   │   ├── jquery.js.gz
│   │       │   │   ├── jquery.min.2c872dbe60f4.js
│   │       │   │   ├── jquery.min.2c872dbe60f4.js.gz
│   │       │   │   ├── jquery.min.js
│   │       │   │   ├── jquery.min.js.gz
│   │       │   │   ├── LICENSE.de877aa6d744.txt
│   │       │   │   ├── LICENSE.de877aa6d744.txt.gz
│   │       │   │   ├── LICENSE.txt
│   │       │   │   └── LICENSE.txt.gz
│   │       │   ├── select2
│   │       │   │   ├── i18n
│   │       │   │   │   ├── af.4f6fcd73488c.js
│   │       │   │   │   ├── af.4f6fcd73488c.js.gz
│   │       │   │   │   ├── af.js
│   │       │   │   │   ├── af.js.gz
│   │       │   │   │   ├── ar.65aa8e36bf5d.js
│   │       │   │   │   ├── ar.65aa8e36bf5d.js.gz
│   │       │   │   │   ├── ar.js
│   │       │   │   │   ├── ar.js.gz
│   │       │   │   │   ├── az.270c257daf81.js
│   │       │   │   │   ├── az.270c257daf81.js.gz
│   │       │   │   │   ├── az.js
│   │       │   │   │   ├── az.js.gz
│   │       │   │   │   ├── bg.39b8be30d4f0.js
│   │       │   │   │   ├── bg.39b8be30d4f0.js.gz
│   │       │   │   │   ├── bg.js
│   │       │   │   │   ├── bg.js.gz
│   │       │   │   │   ├── bn.6d42b4dd5665.js
│   │       │   │   │   ├── bn.6d42b4dd5665.js.gz
│   │       │   │   │   ├── bn.js
│   │       │   │   │   ├── bn.js.gz
│   │       │   │   │   ├── bs.91624382358e.js
│   │       │   │   │   ├── bs.91624382358e.js.gz
│   │       │   │   │   ├── bs.js
│   │       │   │   │   ├── bs.js.gz
│   │       │   │   │   ├── ca.a166b745933a.js
│   │       │   │   │   ├── ca.a166b745933a.js.gz
│   │       │   │   │   ├── ca.js
│   │       │   │   │   ├── ca.js.gz
│   │       │   │   │   ├── cs.4f43e8e7d33a.js
│   │       │   │   │   ├── cs.4f43e8e7d33a.js.gz
│   │       │   │   │   ├── cs.js
│   │       │   │   │   ├── cs.js.gz
│   │       │   │   │   ├── da.766346afe4dd.js
│   │       │   │   │   ├── da.766346afe4dd.js.gz
│   │       │   │   │   ├── da.js
│   │       │   │   │   ├── da.js.gz
│   │       │   │   │   ├── de.8a1c222b0204.js
│   │       │   │   │   ├── de.8a1c222b0204.js.gz
│   │       │   │   │   ├── de.js
│   │       │   │   │   ├── de.js.gz
│   │       │   │   │   ├── dsb.56372c92d2f1.js
│   │       │   │   │   ├── dsb.56372c92d2f1.js.gz
│   │       │   │   │   ├── dsb.js
│   │       │   │   │   ├── dsb.js.gz
│   │       │   │   │   ├── el.27097f071856.js
│   │       │   │   │   ├── el.27097f071856.js.gz
│   │       │   │   │   ├── el.js
│   │       │   │   │   ├── el.js.gz
│   │       │   │   │   ├── en.cf932ba09a98.js
│   │       │   │   │   ├── en.cf932ba09a98.js.gz
│   │       │   │   │   ├── en.js
│   │       │   │   │   ├── en.js.gz
│   │       │   │   │   ├── es.66dbc2652fb1.js
│   │       │   │   │   ├── es.66dbc2652fb1.js.gz
│   │       │   │   │   ├── es.js
│   │       │   │   │   ├── es.js.gz
│   │       │   │   │   ├── et.2b96fd98289d.js
│   │       │   │   │   ├── et.2b96fd98289d.js.gz
│   │       │   │   │   ├── et.js
│   │       │   │   │   ├── et.js.gz
│   │       │   │   │   ├── eu.adfe5c97b72c.js
│   │       │   │   │   ├── eu.adfe5c97b72c.js.gz
│   │       │   │   │   ├── eu.js
│   │       │   │   │   ├── eu.js.gz
│   │       │   │   │   ├── fa.3b5bd1961cfd.js
│   │       │   │   │   ├── fa.3b5bd1961cfd.js.gz
│   │       │   │   │   ├── fa.js
│   │       │   │   │   ├── fa.js.gz
│   │       │   │   │   ├── fi.614ec42aa9ba.js
│   │       │   │   │   ├── fi.614ec42aa9ba.js.gz
│   │       │   │   │   ├── fi.js
│   │       │   │   │   ├── fi.js.gz
│   │       │   │   │   ├── fr.05e0542fcfe6.js
│   │       │   │   │   ├── fr.05e0542fcfe6.js.gz
│   │       │   │   │   ├── fr.js
│   │       │   │   │   ├── fr.js.gz
│   │       │   │   │   ├── gl.d99b1fedaa86.js
│   │       │   │   │   ├── gl.d99b1fedaa86.js.gz
│   │       │   │   │   ├── gl.js
│   │       │   │   │   ├── gl.js.gz
│   │       │   │   │   ├── he.e420ff6cd3ed.js
│   │       │   │   │   ├── he.e420ff6cd3ed.js.gz
│   │       │   │   │   ├── he.js
│   │       │   │   │   ├── he.js.gz
│   │       │   │   │   ├── hi.70640d41628f.js
│   │       │   │   │   ├── hi.70640d41628f.js.gz
│   │       │   │   │   ├── hi.js
│   │       │   │   │   ├── hi.js.gz
│   │       │   │   │   ├── hr.a2b092cc1147.js
│   │       │   │   │   ├── hr.a2b092cc1147.js.gz
│   │       │   │   │   ├── hr.js
│   │       │   │   │   ├── hr.js.gz
│   │       │   │   │   ├── hsb.fa3b55265efe.js
│   │       │   │   │   ├── hsb.fa3b55265efe.js.gz
│   │       │   │   │   ├── hsb.js
│   │       │   │   │   ├── hsb.js.gz
│   │       │   │   │   ├── hu.6ec6039cb8a3.js
│   │       │   │   │   ├── hu.6ec6039cb8a3.js.gz
│   │       │   │   │   ├── hu.js
│   │       │   │   │   ├── hu.js.gz
│   │       │   │   │   ├── hy.c7babaeef5a6.js
│   │       │   │   │   ├── hy.c7babaeef5a6.js.gz
│   │       │   │   │   ├── hy.js
│   │       │   │   │   ├── hy.js.gz
│   │       │   │   │   ├── id.04debded514d.js
│   │       │   │   │   ├── id.04debded514d.js.gz
│   │       │   │   │   ├── id.js
│   │       │   │   │   ├── id.js.gz
│   │       │   │   │   ├── is.3ddd9a6a97e9.js
│   │       │   │   │   ├── is.3ddd9a6a97e9.js.gz
│   │       │   │   │   ├── is.js
│   │       │   │   │   ├── is.js.gz
│   │       │   │   │   ├── it.be4fe8d365b5.js
│   │       │   │   │   ├── it.be4fe8d365b5.js.gz
│   │       │   │   │   ├── it.js
│   │       │   │   │   ├── it.js.gz
│   │       │   │   │   ├── ja.170ae885d74f.js
│   │       │   │   │   ├── ja.170ae885d74f.js.gz
│   │       │   │   │   ├── ja.js
│   │       │   │   │   ├── ja.js.gz
│   │       │   │   │   ├── ka.2083264a54f0.js
│   │       │   │   │   ├── ka.2083264a54f0.js.gz
│   │       │   │   │   ├── ka.js
│   │       │   │   │   ├── ka.js.gz
│   │       │   │   │   ├── km.c23089cb06ca.js
│   │       │   │   │   ├── km.c23089cb06ca.js.gz
│   │       │   │   │   ├── km.js
│   │       │   │   │   ├── km.js.gz
│   │       │   │   │   ├── ko.e7be6c20e673.js
│   │       │   │   │   ├── ko.e7be6c20e673.js.gz
│   │       │   │   │   ├── ko.js
│   │       │   │   │   ├── ko.js.gz
│   │       │   │   │   ├── lt.23c7ce903300.js
│   │       │   │   │   ├── lt.23c7ce903300.js.gz
│   │       │   │   │   ├── lt.js
│   │       │   │   │   ├── lt.js.gz
│   │       │   │   │   ├── lv.08e62128eac1.js
│   │       │   │   │   ├── lv.08e62128eac1.js.gz
│   │       │   │   │   ├── lv.js
│   │       │   │   │   ├── lv.js.gz
│   │       │   │   │   ├── mk.dabbb9087130.js
│   │       │   │   │   ├── mk.dabbb9087130.js.gz
│   │       │   │   │   ├── mk.js
│   │       │   │   │   ├── mk.js.gz
│   │       │   │   │   ├── ms.4ba82c9a51ce.js
│   │       │   │   │   ├── ms.4ba82c9a51ce.js.gz
│   │       │   │   │   ├── ms.js
│   │       │   │   │   ├── ms.js.gz
│   │       │   │   │   ├── nb.da2fce143f27.js
│   │       │   │   │   ├── nb.da2fce143f27.js.gz
│   │       │   │   │   ├── nb.js
│   │       │   │   │   ├── nb.js.gz
│   │       │   │   │   ├── ne.3d79fd3f08db.js
│   │       │   │   │   ├── ne.3d79fd3f08db.js.gz
│   │       │   │   │   ├── ne.js
│   │       │   │   │   ├── ne.js.gz
│   │       │   │   │   ├── nl.997868a37ed8.js
│   │       │   │   │   ├── nl.997868a37ed8.js.gz
│   │       │   │   │   ├── nl.js
│   │       │   │   │   ├── nl.js.gz
│   │       │   │   │   ├── pl.6031b4f16452.js
│   │       │   │   │   ├── pl.6031b4f16452.js.gz
│   │       │   │   │   ├── pl.js
│   │       │   │   │   ├── pl.js.gz
│   │       │   │   │   ├── ps.38dfa47af9e0.js
│   │       │   │   │   ├── ps.38dfa47af9e0.js.gz
│   │       │   │   │   ├── ps.js
│   │       │   │   │   ├── ps.js.gz
│   │       │   │   │   ├── pt-BR.e1b294433e7f.js
│   │       │   │   │   ├── pt-BR.e1b294433e7f.js.gz
│   │       │   │   │   ├── pt-BR.js
│   │       │   │   │   ├── pt-BR.js.gz
│   │       │   │   │   ├── pt.33b4a3b44d43.js
│   │       │   │   │   ├── pt.33b4a3b44d43.js.gz
│   │       │   │   │   ├── pt.js
│   │       │   │   │   ├── pt.js.gz
│   │       │   │   │   ├── ro.f75cb460ec3b.js
│   │       │   │   │   ├── ro.f75cb460ec3b.js.gz
│   │       │   │   │   ├── ro.js
│   │       │   │   │   ├── ro.js.gz
│   │       │   │   │   ├── ru.934aa95f5b5f.js
│   │       │   │   │   ├── ru.934aa95f5b5f.js.gz
│   │       │   │   │   ├── ru.js
│   │       │   │   │   ├── ru.js.gz
│   │       │   │   │   ├── sk.33d02cef8d11.js
│   │       │   │   │   ├── sk.33d02cef8d11.js.gz
│   │       │   │   │   ├── sk.js
│   │       │   │   │   ├── sk.js.gz
│   │       │   │   │   ├── sl.131a78bc0752.js
│   │       │   │   │   ├── sl.131a78bc0752.js.gz
│   │       │   │   │   ├── sl.js
│   │       │   │   │   ├── sl.js.gz
│   │       │   │   │   ├── sq.5636b60d29c9.js
│   │       │   │   │   ├── sq.5636b60d29c9.js.gz
│   │       │   │   │   ├── sq.js
│   │       │   │   │   ├── sq.js.gz
│   │       │   │   │   ├── sr-Cyrl.f254bb8c4c7c.js
│   │       │   │   │   ├── sr-Cyrl.f254bb8c4c7c.js.gz
│   │       │   │   │   ├── sr-Cyrl.js
│   │       │   │   │   ├── sr-Cyrl.js.gz
│   │       │   │   │   ├── sr.5ed85a48f483.js
│   │       │   │   │   ├── sr.5ed85a48f483.js.gz
│   │       │   │   │   ├── sr.js
│   │       │   │   │   ├── sr.js.gz
│   │       │   │   │   ├── sv.7a9c2f71e777.js
│   │       │   │   │   ├── sv.7a9c2f71e777.js.gz
│   │       │   │   │   ├── sv.js
│   │       │   │   │   ├── sv.js.gz
│   │       │   │   │   ├── th.f38c20b0221b.js
│   │       │   │   │   ├── th.f38c20b0221b.js.gz
│   │       │   │   │   ├── th.js
│   │       │   │   │   ├── th.js.gz
│   │       │   │   │   ├── tk.7c572a68c78f.js
│   │       │   │   │   ├── tk.7c572a68c78f.js.gz
│   │       │   │   │   ├── tk.js
│   │       │   │   │   ├── tk.js.gz
│   │       │   │   │   ├── tr.b5a0643d1545.js
│   │       │   │   │   ├── tr.b5a0643d1545.js.gz
│   │       │   │   │   ├── tr.js
│   │       │   │   │   ├── tr.js.gz
│   │       │   │   │   ├── uk.8cede7f4803c.js
│   │       │   │   │   ├── uk.8cede7f4803c.js.gz
│   │       │   │   │   ├── uk.js
│   │       │   │   │   ├── uk.js.gz
│   │       │   │   │   ├── vi.097a5b75b3e1.js
│   │       │   │   │   ├── vi.097a5b75b3e1.js.gz
│   │       │   │   │   ├── vi.js
│   │       │   │   │   ├── vi.js.gz
│   │       │   │   │   ├── zh-CN.2cff662ec5f9.js
│   │       │   │   │   ├── zh-CN.2cff662ec5f9.js.gz
│   │       │   │   │   ├── zh-CN.js
│   │       │   │   │   ├── zh-CN.js.gz
│   │       │   │   │   ├── zh-TW.04554a227c2b.js
│   │       │   │   │   ├── zh-TW.04554a227c2b.js.gz
│   │       │   │   │   ├── zh-TW.js
│   │       │   │   │   └── zh-TW.js.gz
│   │       │   │   ├── LICENSE.f94142512c91.md
│   │       │   │   ├── LICENSE.f94142512c91.md.gz
│   │       │   │   ├── LICENSE.md
│   │       │   │   ├── LICENSE.md.gz
│   │       │   │   ├── select2.full.c2afdeda3058.js
│   │       │   │   ├── select2.full.c2afdeda3058.js.gz
│   │       │   │   ├── select2.full.js
│   │       │   │   ├── select2.full.js.gz
│   │       │   │   ├── select2.full.min.fcd7500d8e13.js
│   │       │   │   ├── select2.full.min.fcd7500d8e13.js.gz
│   │       │   │   ├── select2.full.min.js
│   │       │   │   └── select2.full.min.js.gz
│   │       │   └── xregexp
│   │       │       ├── LICENSE.b6fd2ceea8d3.txt
│   │       │       ├── LICENSE.b6fd2ceea8d3.txt.gz
│   │       │       ├── LICENSE.txt
│   │       │       ├── LICENSE.txt.gz
│   │       │       ├── xregexp.a7e08b0ce686.js
│   │       │       ├── xregexp.a7e08b0ce686.js.gz
│   │       │       ├── xregexp.js
│   │       │       ├── xregexp.js.gz
│   │       │       ├── xregexp.min.f1ae4617847c.js
│   │       │       ├── xregexp.min.f1ae4617847c.js.gz
│   │       │       ├── xregexp.min.js
│   │       │       └── xregexp.min.js.gz
│   │       ├── actions.867b023a736d.js
│   │       ├── actions.867b023a736d.js.gz
│   │       ├── actions.js
│   │       ├── actions.js.gz
│   │       ├── autocomplete.01591ab27be7.js
│   │       ├── autocomplete.01591ab27be7.js.gz
│   │       ├── autocomplete.js
│   │       ├── autocomplete.js.gz
│   │       ├── calendar.d64496bbf46d.js
│   │       ├── calendar.d64496bbf46d.js.gz
│   │       ├── calendar.js
│   │       ├── calendar.js.gz
│   │       ├── cancel.ecc4c5ca7b32.js
│   │       ├── cancel.ecc4c5ca7b32.js.gz
│   │       ├── cancel.js
│   │       ├── cancel.js.gz
│   │       ├── change_form.9d8ca4f96b75.js
│   │       ├── change_form.9d8ca4f96b75.js.gz
│   │       ├── change_form.js
│   │       ├── change_form.js.gz
│   │       ├── collapse.f84e7410290f.js
│   │       ├── collapse.f84e7410290f.js.gz
│   │       ├── collapse.js
│   │       ├── collapse.js.gz
│   │       ├── core.7e257fdf56dc.js
│   │       ├── core.7e257fdf56dc.js.gz
│   │       ├── core.js
│   │       ├── core.js.gz
│   │       ├── filters.0e360b7a9f80.js
│   │       ├── filters.0e360b7a9f80.js.gz
│   │       ├── filters.js
│   │       ├── filters.js.gz
│   │       ├── inlines.22d4d93c00b4.js
│   │       ├── inlines.22d4d93c00b4.js.gz
│   │       ├── inlines.js
│   │       ├── inlines.js.gz
│   │       ├── jquery.init.b7781a0897fc.js
│   │       ├── jquery.init.b7781a0897fc.js.gz
│   │       ├── jquery.init.js
│   │       ├── jquery.init.js.gz
│   │       ├── nav_sidebar.3b9190d420b1.js
│   │       ├── nav_sidebar.3b9190d420b1.js.gz
│   │       ├── nav_sidebar.js
│   │       ├── nav_sidebar.js.gz
│   │       ├── popup_response.c6cc78ea5551.js
│   │       ├── popup_response.c6cc78ea5551.js.gz
│   │       ├── popup_response.js
│   │       ├── popup_response.js.gz
│   │       ├── prepopulate.bd2361dfd64d.js
│   │       ├── prepopulate.bd2361dfd64d.js.gz
│   │       ├── prepopulate.js
│   │       ├── prepopulate.js.gz
│   │       ├── prepopulate_init.6cac7f3105b8.js
│   │       ├── prepopulate_init.6cac7f3105b8.js.gz
│   │       ├── prepopulate_init.js
│   │       ├── prepopulate_init.js.gz
│   │       ├── SelectBox.7d3ce5a98007.js
│   │       ├── SelectBox.7d3ce5a98007.js.gz
│   │       ├── SelectBox.js
│   │       ├── SelectBox.js.gz
│   │       ├── SelectFilter2.b8cf7343ff9e.js
│   │       ├── SelectFilter2.b8cf7343ff9e.js.gz
│   │       ├── SelectFilter2.js
│   │       ├── SelectFilter2.js.gz
│   │       ├── theme.ab270f56bb9c.js
│   │       ├── theme.ab270f56bb9c.js.gz
│   │       ├── theme.js
│   │       ├── theme.js.gz
│   │       ├── urlify.ae970a820212.js
│   │       ├── urlify.ae970a820212.js.gz
│   │       ├── urlify.js
│   │       └── urlify.js.gz
│   ├── cloudinary
│   │   ├── html
│   │   │   ├── cloudinary_cors.31bb92a42818.html
│   │   │   ├── cloudinary_cors.31bb92a42818.html.gz
│   │   │   ├── cloudinary_cors.html
│   │   │   └── cloudinary_cors.html.gz
│   │   └── js
│   │       ├── canvas-to-blob.min.7c7becb6f9ec.js
│   │       ├── canvas-to-blob.min.7c7becb6f9ec.js.gz
│   │       ├── canvas-to-blob.min.js
│   │       ├── canvas-to-blob.min.js.gz
│   │       ├── jquery.cloudinary.171ee44fcb5e.js
│   │       ├── jquery.cloudinary.171ee44fcb5e.js.gz
│   │       ├── jquery.cloudinary.22e7276c8dec.js
│   │       ├── jquery.cloudinary.22e7276c8dec.js.gz
│   │       ├── jquery.cloudinary.js
│   │       ├── jquery.cloudinary.js.gz
│   │       ├── jquery.fileupload-image.7c40367b00f7.js
│   │       ├── jquery.fileupload-image.7c40367b00f7.js.gz
│   │       ├── jquery.fileupload-image.js
│   │       ├── jquery.fileupload-image.js.gz
│   │       ├── jquery.fileupload-process.840f65232eaf.js
│   │       ├── jquery.fileupload-process.840f65232eaf.js.gz
│   │       ├── jquery.fileupload-process.js
│   │       ├── jquery.fileupload-process.js.gz
│   │       ├── jquery.fileupload-validate.a144e6149c89.js
│   │       ├── jquery.fileupload-validate.a144e6149c89.js.gz
│   │       ├── jquery.fileupload-validate.js
│   │       ├── jquery.fileupload-validate.js.gz
│   │       ├── jquery.fileupload.4bfd85460689.js
│   │       ├── jquery.fileupload.4bfd85460689.js.gz
│   │       ├── jquery.fileupload.js
│   │       ├── jquery.fileupload.js.gz
│   │       ├── jquery.iframe-transport.f371e8d9f573.js
│   │       ├── jquery.iframe-transport.f371e8d9f573.js.gz
│   │       ├── jquery.iframe-transport.js
│   │       ├── jquery.iframe-transport.js.gz
│   │       ├── jquery.ui.widget.3d0f0f5ca5d8.js
│   │       ├── jquery.ui.widget.3d0f0f5ca5d8.js.gz
│   │       ├── jquery.ui.widget.js
│   │       ├── jquery.ui.widget.js.gz
│   │       ├── load-image.all.min.d0068a911289.js
│   │       ├── load-image.all.min.d0068a911289.js.gz
│   │       ├── load-image.all.min.js
│   │       └── load-image.all.min.js.gz
│   ├── css
│   │   ├── main.14027cd0b244.css
│   │   ├── main.14027cd0b244.css.gz
│   │   ├── main.6c367898c569.css
│   │   ├── main.6c367898c569.css.gz
│   │   ├── main.css
│   │   └── main.css.gz
│   ├── django_tinymce
│   │   ├── init_tinymce.b74460af7f82.js
│   │   ├── init_tinymce.b74460af7f82.js.gz
│   │   ├── init_tinymce.js
│   │   └── init_tinymce.js.gz
│   ├── img
│   │   ├── favicon.c0fc99342731.png
│   │   ├── favicon.png
│   │   ├── icon-192x192.15f7d103594b.png
│   │   ├── icon-192x192.png
│   │   ├── icon-512x512.8dbf0e3a2379.png
│   │   ├── icon-512x512.png
│   │   ├── mole.2a43db0aa567.svg
│   │   ├── mole.2a43db0aa567.svg.gz
│   │   ├── mole.svg
│   │   └── mole.svg.gz
│   ├── js
│   │   ├── main.1f2402a88d9f.js
│   │   ├── main.1f2402a88d9f.js.gz
│   │   ├── main.6a5424408890.js
│   │   ├── main.6a5424408890.js.gz
│   │   ├── main.js
│   │   └── main.js.gz
│   ├── tinymce
│   │   ├── icons
│   │   │   └── default
│   │   │       ├── icons.min.18db240f0fcf.js
│   │   │       ├── icons.min.18db240f0fcf.js.gz
│   │   │       ├── icons.min.js
│   │   │       └── icons.min.js.gz
│   │   ├── langs
│   │   │   ├── ar.0f886efdc703.js
│   │   │   ├── ar.0f886efdc703.js.gz
│   │   │   ├── ar.js
│   │   │   ├── ar.js.gz
│   │   │   ├── bg_BG.bf161d9f6be1.js
│   │   │   ├── bg_BG.bf161d9f6be1.js.gz
│   │   │   ├── bg_BG.js
│   │   │   ├── bg_BG.js.gz
│   │   │   ├── ca.089ce05c476a.js
│   │   │   ├── ca.089ce05c476a.js.gz
│   │   │   ├── ca.js
│   │   │   ├── ca.js.gz
│   │   │   ├── cs.d10d9585dcd9.js
│   │   │   ├── cs.d10d9585dcd9.js.gz
│   │   │   ├── cs.js
│   │   │   ├── cs.js.gz
│   │   │   ├── cs_CZ.5206a8cfd5b0.js
│   │   │   ├── cs_CZ.5206a8cfd5b0.js.gz
│   │   │   ├── cs_CZ.js
│   │   │   ├── cs_CZ.js.gz
│   │   │   ├── cy.2a0728ef1086.js
│   │   │   ├── cy.2a0728ef1086.js.gz
│   │   │   ├── cy.js
│   │   │   ├── cy.js.gz
│   │   │   ├── da.481aa7c5d1ce.js
│   │   │   ├── da.481aa7c5d1ce.js.gz
│   │   │   ├── da.js
│   │   │   ├── da.js.gz
│   │   │   ├── de.42f1476160d0.js
│   │   │   ├── de.42f1476160d0.js.gz
│   │   │   ├── de.js
│   │   │   ├── de.js.gz
│   │   │   ├── es.f37aca65307a.js
│   │   │   ├── es.f37aca65307a.js.gz
│   │   │   ├── es.js
│   │   │   ├── es.js.gz
│   │   │   ├── es_419.c49024021828.js
│   │   │   ├── es_419.c49024021828.js.gz
│   │   │   ├── es_419.js
│   │   │   ├── es_419.js.gz
│   │   │   ├── es_ES.18469dc8705f.js
│   │   │   ├── es_ES.18469dc8705f.js.gz
│   │   │   ├── es_ES.js
│   │   │   ├── es_ES.js.gz
│   │   │   ├── es_MX.24552fa00cfb.js
│   │   │   ├── es_MX.24552fa00cfb.js.gz
│   │   │   ├── es_MX.js
│   │   │   ├── es_MX.js.gz
│   │   │   ├── eu.1a99e822ee6d.js
│   │   │   ├── eu.1a99e822ee6d.js.gz
│   │   │   ├── eu.js
│   │   │   ├── eu.js.gz
│   │   │   ├── fa.f4242d89d489.js
│   │   │   ├── fa.f4242d89d489.js.gz
│   │   │   ├── fa.js
│   │   │   ├── fa.js.gz
│   │   │   ├── fa_IR.5685ed5d5659.js
│   │   │   ├── fa_IR.5685ed5d5659.js.gz
│   │   │   ├── fa_IR.js
│   │   │   ├── fa_IR.js.gz
│   │   │   ├── fi.9b229553958c.js
│   │   │   ├── fi.9b229553958c.js.gz
│   │   │   ├── fi.js
│   │   │   ├── fi.js.gz
│   │   │   ├── fr_FR.39a6068252db.js
│   │   │   ├── fr_FR.39a6068252db.js.gz
│   │   │   ├── fr_FR.js
│   │   │   ├── fr_FR.js.gz
│   │   │   ├── gl.4c87b5345d76.js
│   │   │   ├── gl.4c87b5345d76.js.gz
│   │   │   ├── gl.js
│   │   │   ├── gl.js.gz
│   │   │   ├── he_IL.ab3335919ec5.js
│   │   │   ├── he_IL.ab3335919ec5.js.gz
│   │   │   ├── he_IL.js
│   │   │   ├── he_IL.js.gz
│   │   │   ├── hr.ab6217dad69a.js
│   │   │   ├── hr.ab6217dad69a.js.gz
│   │   │   ├── hr.js
│   │   │   ├── hr.js.gz
│   │   │   ├── hu_HU.2afccb31e0cd.js
│   │   │   ├── hu_HU.2afccb31e0cd.js.gz
│   │   │   ├── hu_HU.js
│   │   │   ├── hu_HU.js.gz
│   │   │   ├── id.804ca5c83b16.js
│   │   │   ├── id.804ca5c83b16.js.gz
│   │   │   ├── id.js
│   │   │   ├── id.js.gz
│   │   │   ├── it.4c03cbd78f5e.js
│   │   │   ├── it.4c03cbd78f5e.js.gz
│   │   │   ├── it.js
│   │   │   ├── it.js.gz
│   │   │   ├── it_IT.f5f75ba5738d.js
│   │   │   ├── it_IT.f5f75ba5738d.js.gz
│   │   │   ├── it_IT.js
│   │   │   ├── it_IT.js.gz
│   │   │   ├── ja.7199e3d23618.js
│   │   │   ├── ja.7199e3d23618.js.gz
│   │   │   ├── ja.js
│   │   │   ├── ja.js.gz
│   │   │   ├── kab.2d4bcfaaedf5.js
│   │   │   ├── kab.2d4bcfaaedf5.js.gz
│   │   │   ├── kab.js
│   │   │   ├── kab.js.gz
│   │   │   ├── kk.bb3d174d36f8.js
│   │   │   ├── kk.bb3d174d36f8.js.gz
│   │   │   ├── kk.js
│   │   │   ├── kk.js.gz
│   │   │   ├── ko_KR.44fb5d6e154b.js
│   │   │   ├── ko_KR.44fb5d6e154b.js.gz
│   │   │   ├── ko_KR.js
│   │   │   ├── ko_KR.js.gz
│   │   │   ├── lt.b359a6a5f28a.js
│   │   │   ├── lt.b359a6a5f28a.js.gz
│   │   │   ├── lt.js
│   │   │   ├── lt.js.gz
│   │   │   ├── nb_NO.0a7352214f0c.js
│   │   │   ├── nb_NO.0a7352214f0c.js.gz
│   │   │   ├── nb_NO.js
│   │   │   ├── nb_NO.js.gz
│   │   │   ├── nl.6f571210666a.js
│   │   │   ├── nl.6f571210666a.js.gz
│   │   │   ├── nl.js
│   │   │   ├── nl.js.gz
│   │   │   ├── nl_BE.fa016cc8afd2.js
│   │   │   ├── nl_BE.fa016cc8afd2.js.gz
│   │   │   ├── nl_BE.js
│   │   │   ├── nl_BE.js.gz
│   │   │   ├── pl.e250adf7e075.js
│   │   │   ├── pl.e250adf7e075.js.gz
│   │   │   ├── pl.js
│   │   │   ├── pl.js.gz
│   │   │   ├── pt_BR.cc070dfc8935.js
│   │   │   ├── pt_BR.cc070dfc8935.js.gz
│   │   │   ├── pt_BR.js
│   │   │   ├── pt_BR.js.gz
│   │   │   ├── pt_PT.4dd1d7b30c2f.js
│   │   │   ├── pt_PT.4dd1d7b30c2f.js.gz
│   │   │   ├── pt_PT.js
│   │   │   ├── pt_PT.js.gz
│   │   │   ├── readme.a803b8446c1c.md
│   │   │   ├── readme.a803b8446c1c.md.gz
│   │   │   ├── readme.md
│   │   │   ├── readme.md.gz
│   │   │   ├── ro.e23437166aef.js
│   │   │   ├── ro.e23437166aef.js.gz
│   │   │   ├── ro.js
│   │   │   ├── ro.js.gz
│   │   │   ├── ro_RO.270de6be564b.js
│   │   │   ├── ro_RO.270de6be564b.js.gz
│   │   │   ├── ro_RO.js
│   │   │   ├── ro_RO.js.gz
│   │   │   ├── ru.511a44e58e8f.js
│   │   │   ├── ru.511a44e58e8f.js.gz
│   │   │   ├── ru.js
│   │   │   ├── ru.js.gz
│   │   │   ├── ru_RU.1bebc20b01dc.js
│   │   │   ├── ru_RU.1bebc20b01dc.js.gz
│   │   │   ├── ru_RU.js
│   │   │   ├── ru_RU.js.gz
│   │   │   ├── sk.1b3c7faef9a1.js
│   │   │   ├── sk.1b3c7faef9a1.js.gz
│   │   │   ├── sk.js
│   │   │   ├── sk.js.gz
│   │   │   ├── sl.e70856ec865c.js
│   │   │   ├── sl.e70856ec865c.js.gz
│   │   │   ├── sl.js
│   │   │   ├── sl.js.gz
│   │   │   ├── sl_SI.3de18771671f.js
│   │   │   ├── sl_SI.3de18771671f.js.gz
│   │   │   ├── sl_SI.js
│   │   │   ├── sl_SI.js.gz
│   │   │   ├── sq.556fae3040b7.js
│   │   │   ├── sq.556fae3040b7.js.gz
│   │   │   ├── sq.js
│   │   │   ├── sq.js.gz
│   │   │   ├── sv_SE.ed26794df73a.js
│   │   │   ├── sv_SE.ed26794df73a.js.gz
│   │   │   ├── sv_SE.js
│   │   │   ├── sv_SE.js.gz
│   │   │   ├── ta.28baeda3ba8a.js
│   │   │   ├── ta.28baeda3ba8a.js.gz
│   │   │   ├── ta.js
│   │   │   ├── ta.js.gz
│   │   │   ├── ta_IN.c245824dc4a0.js
│   │   │   ├── ta_IN.c245824dc4a0.js.gz
│   │   │   ├── ta_IN.js
│   │   │   ├── ta_IN.js.gz
│   │   │   ├── th_TH.5f149677f730.js
│   │   │   ├── th_TH.5f149677f730.js.gz
│   │   │   ├── th_TH.js
│   │   │   ├── th_TH.js.gz
│   │   │   ├── tr.1d942271407e.js
│   │   │   ├── tr.1d942271407e.js.gz
│   │   │   ├── tr.js
│   │   │   ├── tr.js.gz
│   │   │   ├── tr_TR.21a6afe57b91.js
│   │   │   ├── tr_TR.21a6afe57b91.js.gz
│   │   │   ├── tr_TR.js
│   │   │   ├── tr_TR.js.gz
│   │   │   ├── ug.e8d6f9642abb.js
│   │   │   ├── ug.e8d6f9642abb.js.gz
│   │   │   ├── ug.js
│   │   │   ├── ug.js.gz
│   │   │   ├── uk.b7bc3cca339b.js
│   │   │   ├── uk.b7bc3cca339b.js.gz
│   │   │   ├── uk.js
│   │   │   ├── uk.js.gz
│   │   │   ├── zh_CN.c3ceccb2b20b.js
│   │   │   ├── zh_CN.c3ceccb2b20b.js.gz
│   │   │   ├── zh_CN.js
│   │   │   ├── zh_CN.js.gz
│   │   │   ├── zh_TW.8b3673b738b3.js
│   │   │   ├── zh_TW.8b3673b738b3.js.gz
│   │   │   ├── zh_TW.js
│   │   │   └── zh_TW.js.gz
│   │   ├── plugins
│   │   │   ├── advlist
│   │   │   │   ├── plugin.min.00d4fb9eca62.js
│   │   │   │   ├── plugin.min.00d4fb9eca62.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── anchor
│   │   │   │   ├── plugin.min.51c8b564e509.js
│   │   │   │   ├── plugin.min.51c8b564e509.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── autolink
│   │   │   │   ├── plugin.min.688b6d2b9127.js
│   │   │   │   ├── plugin.min.688b6d2b9127.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── autoresize
│   │   │   │   ├── plugin.min.8eaa32d783b8.js
│   │   │   │   ├── plugin.min.8eaa32d783b8.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── autosave
│   │   │   │   ├── plugin.min.3b843a25997a.js
│   │   │   │   ├── plugin.min.3b843a25997a.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── bbcode
│   │   │   │   ├── plugin.min.0de6978244c6.js
│   │   │   │   ├── plugin.min.0de6978244c6.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── charmap
│   │   │   │   ├── plugin.min.65bff85ca3d2.js
│   │   │   │   ├── plugin.min.65bff85ca3d2.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── code
│   │   │   │   ├── plugin.min.03cb9728521d.js
│   │   │   │   ├── plugin.min.03cb9728521d.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── codesample
│   │   │   │   ├── plugin.min.a62c33f44263.js
│   │   │   │   ├── plugin.min.a62c33f44263.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── colorpicker
│   │   │   │   ├── plugin.min.6af9ccbb69ae.js
│   │   │   │   ├── plugin.min.6af9ccbb69ae.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── contextmenu
│   │   │   │   ├── plugin.min.800529cd78b8.js
│   │   │   │   ├── plugin.min.800529cd78b8.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── directionality
│   │   │   │   ├── plugin.min.e65c75582939.js
│   │   │   │   ├── plugin.min.e65c75582939.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── emoticons
│   │   │   │   ├── js
│   │   │   │   │   ├── emojiimages.b7c1a7f3d27f.js
│   │   │   │   │   ├── emojiimages.b7c1a7f3d27f.js.gz
│   │   │   │   │   ├── emojiimages.js
│   │   │   │   │   ├── emojiimages.js.gz
│   │   │   │   │   ├── emojiimages.min.cd8d1bac37c0.js
│   │   │   │   │   ├── emojiimages.min.cd8d1bac37c0.js.gz
│   │   │   │   │   ├── emojiimages.min.js
│   │   │   │   │   ├── emojiimages.min.js.gz
│   │   │   │   │   ├── emojis.a64de2c5911d.js
│   │   │   │   │   ├── emojis.a64de2c5911d.js.gz
│   │   │   │   │   ├── emojis.js
│   │   │   │   │   ├── emojis.js.gz
│   │   │   │   │   ├── emojis.min.1f434c25c9c5.js
│   │   │   │   │   ├── emojis.min.1f434c25c9c5.js.gz
│   │   │   │   │   ├── emojis.min.js
│   │   │   │   │   └── emojis.min.js.gz
│   │   │   │   ├── plugin.min.805b1a75f7e7.js
│   │   │   │   ├── plugin.min.805b1a75f7e7.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── fullpage
│   │   │   │   ├── plugin.min.e112d3dfe5d7.js
│   │   │   │   ├── plugin.min.e112d3dfe5d7.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── fullscreen
│   │   │   │   ├── plugin.min.ab4d40eafaae.js
│   │   │   │   ├── plugin.min.ab4d40eafaae.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── help
│   │   │   │   ├── plugin.min.e850841efa18.js
│   │   │   │   ├── plugin.min.e850841efa18.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── hr
│   │   │   │   ├── plugin.min.5845ce5d6810.js
│   │   │   │   ├── plugin.min.5845ce5d6810.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── image
│   │   │   │   ├── plugin.min.25569ff5318e.js
│   │   │   │   ├── plugin.min.25569ff5318e.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── imagetools
│   │   │   │   ├── plugin.min.c4fc736b272c.js
│   │   │   │   ├── plugin.min.c4fc736b272c.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── importcss
│   │   │   │   ├── plugin.min.6f4dcbab4b3d.js
│   │   │   │   ├── plugin.min.6f4dcbab4b3d.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── insertdatetime
│   │   │   │   ├── plugin.min.f0af49525ab2.js
│   │   │   │   ├── plugin.min.f0af49525ab2.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── legacyoutput
│   │   │   │   ├── plugin.min.2bfd4f7c2da6.js
│   │   │   │   ├── plugin.min.2bfd4f7c2da6.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── link
│   │   │   │   ├── plugin.min.e7d251e412ab.js
│   │   │   │   ├── plugin.min.e7d251e412ab.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── lists
│   │   │   │   ├── plugin.min.43ff6a7cc605.js
│   │   │   │   ├── plugin.min.43ff6a7cc605.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── nonbreaking
│   │   │   │   ├── plugin.min.f12177e27c51.js
│   │   │   │   ├── plugin.min.f12177e27c51.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── noneditable
│   │   │   │   ├── plugin.min.c5a318661439.js
│   │   │   │   ├── plugin.min.c5a318661439.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── pagebreak
│   │   │   │   ├── plugin.min.3485a93077a1.js
│   │   │   │   ├── plugin.min.3485a93077a1.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── paste
│   │   │   │   ├── plugin.min.180f860cb760.js
│   │   │   │   ├── plugin.min.180f860cb760.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── preview
│   │   │   │   ├── plugin.min.fe3b4c80e4d3.js
│   │   │   │   ├── plugin.min.fe3b4c80e4d3.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── print
│   │   │   │   ├── plugin.min.94afd11638c1.js
│   │   │   │   ├── plugin.min.94afd11638c1.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── quickbars
│   │   │   │   ├── plugin.min.bdb219a6d7c5.js
│   │   │   │   ├── plugin.min.bdb219a6d7c5.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── save
│   │   │   │   ├── plugin.min.6c67d5cd7139.js
│   │   │   │   ├── plugin.min.6c67d5cd7139.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── searchreplace
│   │   │   │   ├── plugin.min.5d4a944aa401.js
│   │   │   │   ├── plugin.min.5d4a944aa401.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── spellchecker
│   │   │   │   ├── plugin.min.11845dcff2a4.js
│   │   │   │   ├── plugin.min.11845dcff2a4.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── tabfocus
│   │   │   │   ├── plugin.min.460dcde02a59.js
│   │   │   │   ├── plugin.min.460dcde02a59.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── table
│   │   │   │   ├── plugin.min.c9841e9586e5.js
│   │   │   │   ├── plugin.min.c9841e9586e5.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── template
│   │   │   │   ├── plugin.min.8294e3b027a6.js
│   │   │   │   ├── plugin.min.8294e3b027a6.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── textcolor
│   │   │   │   ├── plugin.min.e76782136bc8.js
│   │   │   │   ├── plugin.min.e76782136bc8.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── textpattern
│   │   │   │   ├── plugin.min.6fe95078adbe.js
│   │   │   │   ├── plugin.min.6fe95078adbe.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── toc
│   │   │   │   ├── plugin.min.79d5412d0b3b.js
│   │   │   │   ├── plugin.min.79d5412d0b3b.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── visualblocks
│   │   │   │   ├── plugin.min.73b4d8fd6e15.js
│   │   │   │   ├── plugin.min.73b4d8fd6e15.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   ├── visualchars
│   │   │   │   ├── plugin.min.5cdf1a80c304.js
│   │   │   │   ├── plugin.min.5cdf1a80c304.js.gz
│   │   │   │   ├── plugin.min.js
│   │   │   │   └── plugin.min.js.gz
│   │   │   └── wordcount
│   │   │       ├── plugin.min.9cb72147e694.js
│   │   │       ├── plugin.min.9cb72147e694.js.gz
│   │   │       ├── plugin.min.js
│   │   │       └── plugin.min.js.gz
│   │   ├── skins
│   │   │   ├── content
│   │   │   │   ├── dark
│   │   │   │   │   ├── content.min.4c0b8cf274d1.css
│   │   │   │   │   ├── content.min.4c0b8cf274d1.css.gz
│   │   │   │   │   ├── content.min.css
│   │   │   │   │   └── content.min.css.gz
│   │   │   │   ├── default
│   │   │   │   │   ├── content.min.5022f9908e1f.css
│   │   │   │   │   ├── content.min.5022f9908e1f.css.gz
│   │   │   │   │   ├── content.min.css
│   │   │   │   │   └── content.min.css.gz
│   │   │   │   ├── document
│   │   │   │   │   ├── content.min.0ccaf40378ed.css
│   │   │   │   │   ├── content.min.0ccaf40378ed.css.gz
│   │   │   │   │   ├── content.min.css
│   │   │   │   │   └── content.min.css.gz
│   │   │   │   └── writer
│   │   │   │       ├── content.min.856c1120d71e.css
│   │   │   │       ├── content.min.856c1120d71e.css.gz
│   │   │   │       ├── content.min.css
│   │   │   │       └── content.min.css.gz
│   │   │   └── ui
│   │   │       ├── oxide
│   │   │       │   ├── fonts
│   │   │       │   │   ├── tinymce-mobile.baecf466c40e.woff
│   │   │       │   │   └── tinymce-mobile.woff
│   │   │       │   ├── content.inline.min.22d0980afc1f.css
│   │   │       │   ├── content.inline.min.22d0980afc1f.css.gz
│   │   │       │   ├── content.inline.min.css
│   │   │       │   ├── content.inline.min.css.gz
│   │   │       │   ├── content.min.6de47628a73e.css
│   │   │       │   ├── content.min.6de47628a73e.css.gz
│   │   │       │   ├── content.min.css
│   │   │       │   ├── content.min.css.gz
│   │   │       │   ├── content.mobile.min.411c2608b6be.css
│   │   │       │   ├── content.mobile.min.411c2608b6be.css.gz
│   │   │       │   ├── content.mobile.min.css
│   │   │       │   ├── content.mobile.min.css.gz
│   │   │       │   ├── skin.min.40292756e45a.css
│   │   │       │   ├── skin.min.40292756e45a.css.gz
│   │   │       │   ├── skin.min.css
│   │   │       │   ├── skin.min.css.gz
│   │   │       │   ├── skin.mobile.min.a2bbc33fbb7a.css
│   │   │       │   ├── skin.mobile.min.a2bbc33fbb7a.css.gz
│   │   │       │   ├── skin.mobile.min.css
│   │   │       │   ├── skin.mobile.min.css.gz
│   │   │       │   ├── skin.shadowdom.min.css
│   │   │       │   ├── skin.shadowdom.min.css.gz
│   │   │       │   ├── skin.shadowdom.min.e27cb72c7ae5.css
│   │   │       │   └── skin.shadowdom.min.e27cb72c7ae5.css.gz
│   │   │       └── oxide-dark
│   │   │           ├── fonts
│   │   │           │   ├── tinymce-mobile.baecf466c40e.woff
│   │   │           │   └── tinymce-mobile.woff
│   │   │           ├── content.inline.min.22d0980afc1f.css
│   │   │           ├── content.inline.min.22d0980afc1f.css.gz
│   │   │           ├── content.inline.min.css
│   │   │           ├── content.inline.min.css.gz
│   │   │           ├── content.min.23903b9d6f5e.css
│   │   │           ├── content.min.23903b9d6f5e.css.gz
│   │   │           ├── content.min.css
│   │   │           ├── content.min.css.gz
│   │   │           ├── content.mobile.min.411c2608b6be.css
│   │   │           ├── content.mobile.min.411c2608b6be.css.gz
│   │   │           ├── content.mobile.min.css
│   │   │           ├── content.mobile.min.css.gz
│   │   │           ├── skin.min.9e3824fbdfc2.css
│   │   │           ├── skin.min.9e3824fbdfc2.css.gz
│   │   │           ├── skin.min.css
│   │   │           ├── skin.min.css.gz
│   │   │           ├── skin.mobile.min.a2bbc33fbb7a.css
│   │   │           ├── skin.mobile.min.a2bbc33fbb7a.css.gz
│   │   │           ├── skin.mobile.min.css
│   │   │           ├── skin.mobile.min.css.gz
│   │   │           ├── skin.shadowdom.min.css
│   │   │           ├── skin.shadowdom.min.css.gz
│   │   │           ├── skin.shadowdom.min.e27cb72c7ae5.css
│   │   │           └── skin.shadowdom.min.e27cb72c7ae5.css.gz
│   │   ├── themes
│   │   │   ├── mobile
│   │   │   │   ├── theme.min.637f25ef532f.js
│   │   │   │   ├── theme.min.637f25ef532f.js.gz
│   │   │   │   ├── theme.min.js
│   │   │   │   └── theme.min.js.gz
│   │   │   └── silver
│   │   │       ├── theme.min.b84a8ffecd2b.js
│   │   │       ├── theme.min.b84a8ffecd2b.js.gz
│   │   │       ├── theme.min.js
│   │   │       └── theme.min.js.gz
│   │   ├── jquery.tinymce.min.abc669a993b5.js
│   │   ├── jquery.tinymce.min.abc669a993b5.js.gz
│   │   ├── jquery.tinymce.min.js
│   │   ├── jquery.tinymce.min.js.gz
│   │   ├── license.6f9589e0c8df.txt
│   │   ├── license.6f9589e0c8df.txt.gz
│   │   ├── license.txt
│   │   ├── license.txt.gz
│   │   ├── tinymce.d.23fc47c13998.ts
│   │   ├── tinymce.d.23fc47c13998.ts.gz
│   │   ├── tinymce.d.ts
│   │   ├── tinymce.d.ts.gz
│   │   ├── tinymce.min.41e027f3a3ea.js
│   │   ├── tinymce.min.41e027f3a3ea.js.gz
│   │   ├── tinymce.min.js
│   │   └── tinymce.min.js.gz
│   ├── manifest.33386e603f67.json
│   ├── manifest.33386e603f67.json.gz
│   ├── manifest.json
│   ├── manifest.json.gz
│   └── staticfiles.json
├── templates
│   └── sw.js
├── .gitignore
├── build.sh
├── google9bb038f34e823c8d - Copy.html
├── LICENSE
├── manage.py
├── README.MD
└── requirements.txt
```

## Per-file scan results

### .gitignore
- No issues detected by automated scan.

### LICENSE
- No issues detected by automated scan.

### README.MD
- No issues detected by automated scan.

### agency/__init__.py
- Empty file (may be intentional).

### agency/admin.py
- No issues detected by automated scan.

### agency/apps.py
- No issues detected by automated scan.

### agency/forms.py
- No issues detected by automated scan.

### agency/migrations/0001_initial.py
- No issues detected by automated scan.

### agency/migrations/0002_bentogriditem_brochure_chatbotqa.py
- No issues detected by automated scan.

### agency/migrations/0003_strategycalllead_interest_strategycalllead_message.py
- No issues detected by automated scan.

### agency/migrations/0004_alter_strategycalllead_biggest_challenge_and_more.py
- No issues detected by automated scan.

### agency/migrations/__init__.py
- Empty file (may be intentional).

### agency/models.py
- No issues detected by automated scan.

### agency/templates/agency/about.html
- No issues detected by automated scan.

### agency/templates/agency/join_us.html
- No issues detected by automated scan.

### agency/tests.py
- No issues detected by automated scan.

### agency/urls.py
- No issues detected by automated scan.

### agency/views.py
- No issues detected by automated scan.

### blog/__init__.py
- Empty file (may be intentional).

### blog/admin.py
- No issues detected by automated scan.

### blog/apps.py
- No issues detected by automated scan.

### blog/migrations/0001_initial.py
- No issues detected by automated scan.

### blog/migrations/0002_alter_blogpost_author.py
- No issues detected by automated scan.

### blog/migrations/0003_alter_blogpost_header_image_and_more.py
- No issues detected by automated scan.

### blog/migrations/0004_alter_blogpost_is_featured.py
- No issues detected by automated scan.

### blog/migrations/__init__.py
- Empty file (may be intentional).

### blog/models.py
- No issues detected by automated scan.

### blog/templates/blog/blog_index.html
- No issues detected by automated scan.

### blog/templates/blog/blog_post_detail.html
- No issues detected by automated scan.

### blog/tests.py
- No issues detected by automated scan.

### blog/urls.py
- No issues detected by automated scan.

### blog/views.py
- No issues detected by automated scan.

### build.sh
- No issues detected by automated scan.

### core/__init__.py
- Empty file (may be intentional).

### core/admin.py
- No issues detected by automated scan.

### core/apps.py
- No issues detected by automated scan.

### core/management/__init__.py
- Empty file (may be intentional).

### core/management/commands/__init__.py
- Empty file (may be intentional).

### core/management/commands/createsu.py
- No issues detected by automated scan.

### core/management/commands/ensure_profiles.py
- No issues detected by automated scan.

### core/management/commands/resetadminpass.py
- No issues detected by automated scan.

### core/migrations/0001_initial.py
- No issues detected by automated scan.

### core/migrations/__init__.py
- Empty file (may be intentional).

### core/models.py
- No issues detected by automated scan.

### core/signals.py
- No issues detected by automated scan.

### core/templates/base.html
- No issues detected by automated scan.

### core/templates/core/breadcrumbs.html
- No issues detected by automated scan.

### core/templates/core/contact.html
- No issues detected by automated scan.

### core/templates/core/faq.html
- No issues detected by automated scan.

### core/templates/core/privacy.html
- No issues detected by automated scan.

### core/templates/core/terms.html
- No issues detected by automated scan.

### core/templates/home.html
- No issues detected by automated scan.

### core/tests.py
- No issues detected by automated scan.

### core/urls.py
- No issues detected by automated scan.

### core/views.py
- No issues detected by automated scan.

### dearco_portfolio/__init__.py
- Empty file (may be intentional).

### dearco_portfolio/asgi.py
- No issues detected by automated scan.

### dearco_portfolio/settings.py
- No issues detected by automated scan.

### dearco_portfolio/urls.py
- No issues detected by automated scan.

### dearco_portfolio/wsgi.py
- No issues detected by automated scan.

### doc/bug_report.md
- No issues detected by automated scan.

### doc/changes.md
- No issues detected by automated scan.

### doc/github_context.md
- No issues detected by automated scan.

### doc/implementation_plan.md
- No issues detected by automated scan.

### doc/project_architecture.md
- No issues detected by automated scan.

### doc/walkthrough.md
- No issues detected by automated scan.

### google9bb038f34e823c8d - Copy.html
- No issues detected by automated scan.

### manage.py
- No issues detected by automated scan.

### portfolio/__init__.py
- Empty file (may be intentional).

### portfolio/admin.py
- No issues detected by automated scan.

### portfolio/apps.py
- No issues detected by automated scan.

### portfolio/forms.py
- No issues detected by automated scan.

### portfolio/migrations/0001_initial.py
- No issues detected by automated scan.

### portfolio/migrations/__init__.py
- Empty file (may be intentional).

### portfolio/models.py
- No issues detected by automated scan.

### portfolio/templates/portfolio/portfolio_all.html
- No issues detected by automated scan.

### portfolio/templates/portfolio/team.html
- No issues detected by automated scan.

### portfolio/tests.py
- No issues detected by automated scan.

### portfolio/urls.py
- No issues detected by automated scan.

### portfolio/views.py
- No issues detected by automated scan.

### requirements.txt
- No issues detected by automated scan.

### site_settings/__init__.py
- Empty file (may be intentional).

### site_settings/admin.py
- No issues detected by automated scan.

### site_settings/apps.py
- No issues detected by automated scan.

### site_settings/context_processors.py
- No issues detected by automated scan.

### site_settings/migrations/0001_initial.py
- No issues detected by automated scan.

### site_settings/migrations/__init__.py
- Empty file (may be intentional).

### site_settings/models.py
- No issues detected by automated scan.

### site_settings/tests.py
- No issues detected by automated scan.

### site_settings/views.py
- No issues detected by automated scan.

### static/css/main.css
- No issues detected by automated scan.

### static/img/favicon.png
- Binary file; skipped text scan.

### static/img/icon-192x192.png
- Binary file; skipped text scan.

### static/img/icon-512x512.png
- Binary file; skipped text scan.

### static/img/mole.svg
- No issues detected by automated scan.

### static/js/main.js
- No issues detected by automated scan.

### static/manifest.json
- No issues detected by automated scan.

### staticfiles/admin/css/autocomplete.4a81fc4242d0.css
- No issues detected by automated scan.

### staticfiles/admin/css/autocomplete.4a81fc4242d0.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/autocomplete.css
- No issues detected by automated scan.

### staticfiles/admin/css/autocomplete.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/base.9f65b5cd54b3.css
- No issues detected by automated scan.

### staticfiles/admin/css/base.9f65b5cd54b3.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/base.css
- No issues detected by automated scan.

### staticfiles/admin/css/base.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/changelists.47cb433b29d4.css
- No issues detected by automated scan.

### staticfiles/admin/css/changelists.47cb433b29d4.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/changelists.css
- No issues detected by automated scan.

### staticfiles/admin/css/changelists.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/dark_mode.css
- No issues detected by automated scan.

### staticfiles/admin/css/dark_mode.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/dark_mode.e18e9a052429.css
- No issues detected by automated scan.

### staticfiles/admin/css/dark_mode.e18e9a052429.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/dashboard.css
- No issues detected by automated scan.

### staticfiles/admin/css/dashboard.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/dashboard.e90f2068217b.css
- No issues detected by automated scan.

### staticfiles/admin/css/dashboard.e90f2068217b.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/forms.b29a0c8c9155.css
- No issues detected by automated scan.

### staticfiles/admin/css/forms.b29a0c8c9155.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/forms.css
- No issues detected by automated scan.

### staticfiles/admin/css/forms.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/login.586129c60a93.css
- No issues detected by automated scan.

### staticfiles/admin/css/login.586129c60a93.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/login.css
- No issues detected by automated scan.

### staticfiles/admin/css/login.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/nav_sidebar.css
- No issues detected by automated scan.

### staticfiles/admin/css/nav_sidebar.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/nav_sidebar.dd925738f4cc.css
- No issues detected by automated scan.

### staticfiles/admin/css/nav_sidebar.dd925738f4cc.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/responsive.css
- No issues detected by automated scan.

### staticfiles/admin/css/responsive.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/responsive.eafb93ff084c.css
- No issues detected by automated scan.

### staticfiles/admin/css/responsive.eafb93ff084c.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/responsive_rtl.7d1130848605.css
- No issues detected by automated scan.

### staticfiles/admin/css/responsive_rtl.7d1130848605.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/responsive_rtl.css
- No issues detected by automated scan.

### staticfiles/admin/css/responsive_rtl.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/rtl.aa92d763340b.css
- No issues detected by automated scan.

### staticfiles/admin/css/rtl.aa92d763340b.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/rtl.css
- No issues detected by automated scan.

### staticfiles/admin/css/rtl.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/vendor/select2/LICENSE-SELECT2.f94142512c91.md
- No issues detected by automated scan.

### staticfiles/admin/css/vendor/select2/LICENSE-SELECT2.f94142512c91.md.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/vendor/select2/LICENSE-SELECT2.md
- No issues detected by automated scan.

### staticfiles/admin/css/vendor/select2/LICENSE-SELECT2.md.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/vendor/select2/select2.a2194c262648.css
- No issues detected by automated scan.

### staticfiles/admin/css/vendor/select2/select2.a2194c262648.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/vendor/select2/select2.css
- No issues detected by automated scan.

### staticfiles/admin/css/vendor/select2/select2.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/vendor/select2/select2.min.9f54e6414f87.css
- No issues detected by automated scan.

### staticfiles/admin/css/vendor/select2/select2.min.9f54e6414f87.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/vendor/select2/select2.min.css
- No issues detected by automated scan.

### staticfiles/admin/css/vendor/select2/select2.min.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/widgets.8a70ea6d8850.css
- No issues detected by automated scan.

### staticfiles/admin/css/widgets.8a70ea6d8850.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/css/widgets.css
- No issues detected by automated scan.

### staticfiles/admin/css/widgets.css.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/LICENSE
- No issues detected by automated scan.

### staticfiles/admin/img/LICENSE.2c54f4e1ca1c
- No issues detected by automated scan.

### staticfiles/admin/img/LICENSE.2c54f4e1ca1c.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/LICENSE.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/README.a70711a38d87.txt
- No issues detected by automated scan.

### staticfiles/admin/img/README.a70711a38d87.txt.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/README.txt
- No issues detected by automated scan.

### staticfiles/admin/img/README.txt.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/calendar-icons.39b290681a8b.svg
- No issues detected by automated scan.

### staticfiles/admin/img/calendar-icons.39b290681a8b.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/calendar-icons.svg
- No issues detected by automated scan.

### staticfiles/admin/img/calendar-icons.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/gis/move_vertex_off.7a23bf31ef8a.svg
- No issues detected by automated scan.

### staticfiles/admin/img/gis/move_vertex_off.7a23bf31ef8a.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/gis/move_vertex_off.svg
- No issues detected by automated scan.

### staticfiles/admin/img/gis/move_vertex_off.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/gis/move_vertex_on.0047eba25b67.svg
- No issues detected by automated scan.

### staticfiles/admin/img/gis/move_vertex_on.0047eba25b67.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/gis/move_vertex_on.svg
- No issues detected by automated scan.

### staticfiles/admin/img/gis/move_vertex_on.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-addlink.d519b3bab011.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-addlink.d519b3bab011.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-addlink.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-addlink.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-alert.034cc7d8a67f.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-alert.034cc7d8a67f.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-alert.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-alert.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-calendar.ac7aea671bea.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-calendar.ac7aea671bea.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-calendar.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-calendar.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-changelink.18d2fd706348.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-changelink.18d2fd706348.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-changelink.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-changelink.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-clock.e1d4dfac3f2b.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-clock.e1d4dfac3f2b.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-clock.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-clock.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-deletelink.564ef9dc3854.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-deletelink.564ef9dc3854.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-deletelink.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-deletelink.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-hidelink.8d245a995e18.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-hidelink.8d245a995e18.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-hidelink.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-hidelink.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-no.439e821418cd.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-no.439e821418cd.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-no.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-no.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-unknown-alt.81536e128bb6.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-unknown-alt.81536e128bb6.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-unknown-alt.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-unknown-alt.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-unknown.a18cb4398978.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-unknown.a18cb4398978.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-unknown.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-unknown.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-viewlink.41eb31f7826e.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-viewlink.41eb31f7826e.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-viewlink.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-viewlink.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-yes.d2f9f035226a.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-yes.d2f9f035226a.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/icon-yes.svg
- No issues detected by automated scan.

### staticfiles/admin/img/icon-yes.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/inline-delete.fec1b761f254.svg
- No issues detected by automated scan.

### staticfiles/admin/img/inline-delete.fec1b761f254.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/inline-delete.svg
- No issues detected by automated scan.

### staticfiles/admin/img/inline-delete.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/search.7cf54ff789c6.svg
- No issues detected by automated scan.

### staticfiles/admin/img/search.7cf54ff789c6.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/search.svg
- No issues detected by automated scan.

### staticfiles/admin/img/search.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/selector-icons.b4555096cea2.svg
- No issues detected by automated scan.

### staticfiles/admin/img/selector-icons.b4555096cea2.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/selector-icons.svg
- No issues detected by automated scan.

### staticfiles/admin/img/selector-icons.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/sorting-icons.3a097b59f104.svg
- No issues detected by automated scan.

### staticfiles/admin/img/sorting-icons.3a097b59f104.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/sorting-icons.svg
- No issues detected by automated scan.

### staticfiles/admin/img/sorting-icons.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/tooltag-add.e59d620a9742.svg
- No issues detected by automated scan.

### staticfiles/admin/img/tooltag-add.e59d620a9742.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/tooltag-add.svg
- No issues detected by automated scan.

### staticfiles/admin/img/tooltag-add.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/tooltag-arrowright.bbfb788a849e.svg
- No issues detected by automated scan.

### staticfiles/admin/img/tooltag-arrowright.bbfb788a849e.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/img/tooltag-arrowright.svg
- No issues detected by automated scan.

### staticfiles/admin/img/tooltag-arrowright.svg.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/SelectBox.7d3ce5a98007.js
- No issues detected by automated scan.

### staticfiles/admin/js/SelectBox.7d3ce5a98007.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/SelectBox.js
- No issues detected by automated scan.

### staticfiles/admin/js/SelectBox.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/SelectFilter2.b8cf7343ff9e.js
- No issues detected by automated scan.

### staticfiles/admin/js/SelectFilter2.b8cf7343ff9e.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/SelectFilter2.js
- No issues detected by automated scan.

### staticfiles/admin/js/SelectFilter2.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/actions.867b023a736d.js
- No issues detected by automated scan.

### staticfiles/admin/js/actions.867b023a736d.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/actions.js
- No issues detected by automated scan.

### staticfiles/admin/js/actions.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/admin/DateTimeShortcuts.9f6e209cebca.js
- No issues detected by automated scan.

### staticfiles/admin/js/admin/DateTimeShortcuts.9f6e209cebca.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/admin/DateTimeShortcuts.js
- No issues detected by automated scan.

### staticfiles/admin/js/admin/DateTimeShortcuts.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/admin/RelatedObjectLookups.ef211845e458.js
- No issues detected by automated scan.

### staticfiles/admin/js/admin/RelatedObjectLookups.ef211845e458.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/admin/RelatedObjectLookups.js
- No issues detected by automated scan.

### staticfiles/admin/js/admin/RelatedObjectLookups.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/autocomplete.01591ab27be7.js
- No issues detected by automated scan.

### staticfiles/admin/js/autocomplete.01591ab27be7.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/autocomplete.js
- No issues detected by automated scan.

### staticfiles/admin/js/autocomplete.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/calendar.d64496bbf46d.js
- No issues detected by automated scan.

### staticfiles/admin/js/calendar.d64496bbf46d.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/calendar.js
- No issues detected by automated scan.

### staticfiles/admin/js/calendar.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/cancel.ecc4c5ca7b32.js
- No issues detected by automated scan.

### staticfiles/admin/js/cancel.ecc4c5ca7b32.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/cancel.js
- No issues detected by automated scan.

### staticfiles/admin/js/cancel.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/change_form.9d8ca4f96b75.js
- No issues detected by automated scan.

### staticfiles/admin/js/change_form.9d8ca4f96b75.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/change_form.js
- No issues detected by automated scan.

### staticfiles/admin/js/change_form.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/collapse.f84e7410290f.js
- No issues detected by automated scan.

### staticfiles/admin/js/collapse.f84e7410290f.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/collapse.js
- No issues detected by automated scan.

### staticfiles/admin/js/collapse.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/core.7e257fdf56dc.js
- No issues detected by automated scan.

### staticfiles/admin/js/core.7e257fdf56dc.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/core.js
- No issues detected by automated scan.

### staticfiles/admin/js/core.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/filters.0e360b7a9f80.js
- No issues detected by automated scan.

### staticfiles/admin/js/filters.0e360b7a9f80.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/filters.js
- No issues detected by automated scan.

### staticfiles/admin/js/filters.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/inlines.22d4d93c00b4.js
- No issues detected by automated scan.

### staticfiles/admin/js/inlines.22d4d93c00b4.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/inlines.js
- No issues detected by automated scan.

### staticfiles/admin/js/inlines.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/jquery.init.b7781a0897fc.js
- No issues detected by automated scan.

### staticfiles/admin/js/jquery.init.b7781a0897fc.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/jquery.init.js
- No issues detected by automated scan.

### staticfiles/admin/js/jquery.init.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/nav_sidebar.3b9190d420b1.js
- No issues detected by automated scan.

### staticfiles/admin/js/nav_sidebar.3b9190d420b1.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/nav_sidebar.js
- No issues detected by automated scan.

### staticfiles/admin/js/nav_sidebar.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/popup_response.c6cc78ea5551.js
- No issues detected by automated scan.

### staticfiles/admin/js/popup_response.c6cc78ea5551.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/popup_response.js
- No issues detected by automated scan.

### staticfiles/admin/js/popup_response.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/prepopulate.bd2361dfd64d.js
- No issues detected by automated scan.

### staticfiles/admin/js/prepopulate.bd2361dfd64d.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/prepopulate.js
- No issues detected by automated scan.

### staticfiles/admin/js/prepopulate.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/prepopulate_init.6cac7f3105b8.js
- No issues detected by automated scan.

### staticfiles/admin/js/prepopulate_init.6cac7f3105b8.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/prepopulate_init.js
- No issues detected by automated scan.

### staticfiles/admin/js/prepopulate_init.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/theme.ab270f56bb9c.js
- No issues detected by automated scan.

### staticfiles/admin/js/theme.ab270f56bb9c.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/theme.js
- No issues detected by automated scan.

### staticfiles/admin/js/theme.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/urlify.ae970a820212.js
- No issues detected by automated scan.

### staticfiles/admin/js/urlify.ae970a820212.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/urlify.js
- No issues detected by automated scan.

### staticfiles/admin/js/urlify.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/jquery/LICENSE.de877aa6d744.txt
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/jquery/LICENSE.de877aa6d744.txt.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/jquery/LICENSE.txt
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/jquery/LICENSE.txt.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/jquery/jquery.12e87d2f3a4c.js
- Contains TODO/FIXME markers; review needed.
- Contains tab characters; may violate style expectations.

### staticfiles/admin/js/vendor/jquery/jquery.12e87d2f3a4c.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/jquery/jquery.js
- Contains TODO/FIXME markers; review needed.
- Contains tab characters; may violate style expectations.

### staticfiles/admin/js/vendor/jquery/jquery.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/jquery/jquery.min.2c872dbe60f4.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/jquery/jquery.min.2c872dbe60f4.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/jquery/jquery.min.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/jquery/jquery.min.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/LICENSE.f94142512c91.md
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/LICENSE.f94142512c91.md.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/LICENSE.md
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/LICENSE.md.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/af.4f6fcd73488c.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/af.4f6fcd73488c.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/af.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/af.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ar.65aa8e36bf5d.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ar.65aa8e36bf5d.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ar.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ar.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/az.270c257daf81.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/az.270c257daf81.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/az.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/az.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/bg.39b8be30d4f0.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/bg.39b8be30d4f0.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/bg.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/bg.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/bn.6d42b4dd5665.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/bn.6d42b4dd5665.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/bn.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/bn.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/bs.91624382358e.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/bs.91624382358e.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/bs.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/bs.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ca.a166b745933a.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ca.a166b745933a.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ca.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ca.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/cs.4f43e8e7d33a.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/cs.4f43e8e7d33a.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/cs.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/cs.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/da.766346afe4dd.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/da.766346afe4dd.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/da.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/da.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/de.8a1c222b0204.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/de.8a1c222b0204.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/de.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/de.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/dsb.56372c92d2f1.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/dsb.56372c92d2f1.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/dsb.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/dsb.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/el.27097f071856.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/el.27097f071856.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/el.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/el.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/en.cf932ba09a98.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/en.cf932ba09a98.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/en.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/en.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/es.66dbc2652fb1.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/es.66dbc2652fb1.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/es.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/es.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/et.2b96fd98289d.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/et.2b96fd98289d.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/et.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/et.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/eu.adfe5c97b72c.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/eu.adfe5c97b72c.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/eu.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/eu.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/fa.3b5bd1961cfd.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/fa.3b5bd1961cfd.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/fa.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/fa.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/fi.614ec42aa9ba.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/fi.614ec42aa9ba.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/fi.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/fi.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/fr.05e0542fcfe6.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/fr.05e0542fcfe6.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/fr.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/fr.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/gl.d99b1fedaa86.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/gl.d99b1fedaa86.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/gl.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/gl.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/he.e420ff6cd3ed.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/he.e420ff6cd3ed.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/he.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/he.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/hi.70640d41628f.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/hi.70640d41628f.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/hi.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/hi.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/hr.a2b092cc1147.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/hr.a2b092cc1147.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/hr.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/hr.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/hsb.fa3b55265efe.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/hsb.fa3b55265efe.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/hsb.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/hsb.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/hu.6ec6039cb8a3.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/hu.6ec6039cb8a3.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/hu.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/hu.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/hy.c7babaeef5a6.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/hy.c7babaeef5a6.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/hy.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/hy.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/id.04debded514d.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/id.04debded514d.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/id.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/id.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/is.3ddd9a6a97e9.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/is.3ddd9a6a97e9.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/is.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/is.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/it.be4fe8d365b5.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/it.be4fe8d365b5.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/it.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/it.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ja.170ae885d74f.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ja.170ae885d74f.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ja.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ja.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ka.2083264a54f0.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ka.2083264a54f0.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ka.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ka.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/km.c23089cb06ca.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/km.c23089cb06ca.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/km.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/km.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ko.e7be6c20e673.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ko.e7be6c20e673.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ko.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ko.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/lt.23c7ce903300.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/lt.23c7ce903300.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/lt.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/lt.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/lv.08e62128eac1.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/lv.08e62128eac1.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/lv.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/lv.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/mk.dabbb9087130.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/mk.dabbb9087130.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/mk.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/mk.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ms.4ba82c9a51ce.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ms.4ba82c9a51ce.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ms.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ms.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/nb.da2fce143f27.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/nb.da2fce143f27.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/nb.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/nb.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ne.3d79fd3f08db.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ne.3d79fd3f08db.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ne.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ne.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/nl.997868a37ed8.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/nl.997868a37ed8.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/nl.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/nl.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/pl.6031b4f16452.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/pl.6031b4f16452.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/pl.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/pl.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ps.38dfa47af9e0.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ps.38dfa47af9e0.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ps.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ps.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/pt-BR.e1b294433e7f.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/pt-BR.e1b294433e7f.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/pt-BR.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/pt-BR.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/pt.33b4a3b44d43.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/pt.33b4a3b44d43.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/pt.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/pt.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ro.f75cb460ec3b.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ro.f75cb460ec3b.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ro.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ro.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ru.934aa95f5b5f.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ru.934aa95f5b5f.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/ru.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/ru.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sk.33d02cef8d11.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sk.33d02cef8d11.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sk.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sk.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sl.131a78bc0752.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sl.131a78bc0752.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sl.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sl.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sq.5636b60d29c9.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sq.5636b60d29c9.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sq.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sq.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sr-Cyrl.f254bb8c4c7c.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sr-Cyrl.f254bb8c4c7c.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sr-Cyrl.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sr-Cyrl.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sr.5ed85a48f483.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sr.5ed85a48f483.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sr.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sr.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sv.7a9c2f71e777.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sv.7a9c2f71e777.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/sv.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/sv.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/th.f38c20b0221b.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/th.f38c20b0221b.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/th.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/th.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/tk.7c572a68c78f.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/tk.7c572a68c78f.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/tk.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/tk.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/tr.b5a0643d1545.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/tr.b5a0643d1545.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/tr.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/tr.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/uk.8cede7f4803c.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/uk.8cede7f4803c.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/uk.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/uk.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/vi.097a5b75b3e1.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/vi.097a5b75b3e1.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/vi.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/vi.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/zh-CN.2cff662ec5f9.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/zh-CN.2cff662ec5f9.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/zh-CN.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/zh-CN.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/zh-TW.04554a227c2b.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/zh-TW.04554a227c2b.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/i18n/zh-TW.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/i18n/zh-TW.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/select2.full.c2afdeda3058.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/select2.full.c2afdeda3058.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/select2.full.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/select2.full.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/select2.full.min.fcd7500d8e13.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/select2.full.min.fcd7500d8e13.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/select2/select2.full.min.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/select2/select2.full.min.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/xregexp/LICENSE.b6fd2ceea8d3.txt
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/xregexp/LICENSE.b6fd2ceea8d3.txt.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/xregexp/LICENSE.txt
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/xregexp/LICENSE.txt.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/xregexp/xregexp.a7e08b0ce686.js
- Contains TODO/FIXME markers; review needed.

### staticfiles/admin/js/vendor/xregexp/xregexp.a7e08b0ce686.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/xregexp/xregexp.js
- Contains TODO/FIXME markers; review needed.

### staticfiles/admin/js/vendor/xregexp/xregexp.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/xregexp/xregexp.min.f1ae4617847c.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/xregexp/xregexp.min.f1ae4617847c.js.gz
- Binary file; skipped text scan.

### staticfiles/admin/js/vendor/xregexp/xregexp.min.js
- No issues detected by automated scan.

### staticfiles/admin/js/vendor/xregexp/xregexp.min.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/html/cloudinary_cors.31bb92a42818.html
- No issues detected by automated scan.

### staticfiles/cloudinary/html/cloudinary_cors.31bb92a42818.html.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/html/cloudinary_cors.html
- No issues detected by automated scan.

### staticfiles/cloudinary/html/cloudinary_cors.html.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/canvas-to-blob.min.7c7becb6f9ec.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/canvas-to-blob.min.7c7becb6f9ec.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/canvas-to-blob.min.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/canvas-to-blob.min.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.cloudinary.171ee44fcb5e.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.cloudinary.171ee44fcb5e.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.cloudinary.22e7276c8dec.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.cloudinary.22e7276c8dec.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.cloudinary.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.cloudinary.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.fileupload-image.7c40367b00f7.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.fileupload-image.7c40367b00f7.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.fileupload-image.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.fileupload-image.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.fileupload-process.840f65232eaf.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.fileupload-process.840f65232eaf.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.fileupload-process.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.fileupload-process.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.fileupload-validate.a144e6149c89.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.fileupload-validate.a144e6149c89.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.fileupload-validate.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.fileupload-validate.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.fileupload.4bfd85460689.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.fileupload.4bfd85460689.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.fileupload.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.fileupload.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.iframe-transport.f371e8d9f573.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.iframe-transport.f371e8d9f573.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.iframe-transport.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/jquery.iframe-transport.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.ui.widget.3d0f0f5ca5d8.js
- Contains TODO/FIXME markers; review needed.

### staticfiles/cloudinary/js/jquery.ui.widget.3d0f0f5ca5d8.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/jquery.ui.widget.js
- Contains TODO/FIXME markers; review needed.

### staticfiles/cloudinary/js/jquery.ui.widget.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/load-image.all.min.d0068a911289.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/load-image.all.min.d0068a911289.js.gz
- Binary file; skipped text scan.

### staticfiles/cloudinary/js/load-image.all.min.js
- No issues detected by automated scan.

### staticfiles/cloudinary/js/load-image.all.min.js.gz
- Binary file; skipped text scan.

### staticfiles/css/main.14027cd0b244.css
- No issues detected by automated scan.

### staticfiles/css/main.14027cd0b244.css.gz
- Binary file; skipped text scan.

### staticfiles/css/main.6c367898c569.css
- No issues detected by automated scan.

### staticfiles/css/main.6c367898c569.css.gz
- Binary file; skipped text scan.

### staticfiles/css/main.css
- No issues detected by automated scan.

### staticfiles/css/main.css.gz
- Binary file; skipped text scan.

### staticfiles/django_tinymce/init_tinymce.b74460af7f82.js
- No issues detected by automated scan.

### staticfiles/django_tinymce/init_tinymce.b74460af7f82.js.gz
- Binary file; skipped text scan.

### staticfiles/django_tinymce/init_tinymce.js
- No issues detected by automated scan.

### staticfiles/django_tinymce/init_tinymce.js.gz
- Binary file; skipped text scan.

### staticfiles/img/favicon.c0fc99342731.png
- Binary file; skipped text scan.

### staticfiles/img/favicon.png
- Binary file; skipped text scan.

### staticfiles/img/icon-192x192.15f7d103594b.png
- Binary file; skipped text scan.

### staticfiles/img/icon-192x192.png
- Binary file; skipped text scan.

### staticfiles/img/icon-512x512.8dbf0e3a2379.png
- Binary file; skipped text scan.

### staticfiles/img/icon-512x512.png
- Binary file; skipped text scan.

### staticfiles/img/mole.2a43db0aa567.svg
- No issues detected by automated scan.

### staticfiles/img/mole.2a43db0aa567.svg.gz
- Binary file; skipped text scan.

### staticfiles/img/mole.svg
- No issues detected by automated scan.

### staticfiles/img/mole.svg.gz
- Binary file; skipped text scan.

### staticfiles/js/main.1f2402a88d9f.js
- No issues detected by automated scan.

### staticfiles/js/main.1f2402a88d9f.js.gz
- Binary file; skipped text scan.

### staticfiles/js/main.6a5424408890.js
- No issues detected by automated scan.

### staticfiles/js/main.6a5424408890.js.gz
- Binary file; skipped text scan.

### staticfiles/js/main.js
- No issues detected by automated scan.

### staticfiles/js/main.js.gz
- Binary file; skipped text scan.

### staticfiles/manifest.33386e603f67.json
- No issues detected by automated scan.

### staticfiles/manifest.33386e603f67.json.gz
- Binary file; skipped text scan.

### staticfiles/manifest.json
- No issues detected by automated scan.

### staticfiles/manifest.json.gz
- Binary file; skipped text scan.

### staticfiles/staticfiles.json
- No issues detected by automated scan.

### staticfiles/tinymce/icons/default/icons.min.18db240f0fcf.js
- No issues detected by automated scan.

### staticfiles/tinymce/icons/default/icons.min.18db240f0fcf.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/icons/default/icons.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/icons/default/icons.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/jquery.tinymce.min.abc669a993b5.js
- No issues detected by automated scan.

### staticfiles/tinymce/jquery.tinymce.min.abc669a993b5.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/jquery.tinymce.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/jquery.tinymce.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ar.0f886efdc703.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ar.0f886efdc703.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ar.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ar.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/bg_BG.bf161d9f6be1.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/bg_BG.bf161d9f6be1.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/bg_BG.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/bg_BG.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ca.089ce05c476a.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ca.089ce05c476a.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ca.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ca.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/cs.d10d9585dcd9.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/cs.d10d9585dcd9.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/cs.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/cs.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/cs_CZ.5206a8cfd5b0.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/cs_CZ.5206a8cfd5b0.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/cs_CZ.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/cs_CZ.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/cy.2a0728ef1086.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/cy.2a0728ef1086.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/cy.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/cy.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/da.481aa7c5d1ce.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/da.481aa7c5d1ce.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/da.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/da.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/de.42f1476160d0.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/de.42f1476160d0.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/de.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/de.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/es.f37aca65307a.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/es.f37aca65307a.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/es.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/es.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/es_419.c49024021828.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/es_419.c49024021828.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/es_419.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/es_419.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/es_ES.18469dc8705f.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/es_ES.18469dc8705f.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/es_ES.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/es_ES.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/es_MX.24552fa00cfb.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/es_MX.24552fa00cfb.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/es_MX.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/es_MX.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/eu.1a99e822ee6d.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/eu.1a99e822ee6d.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/eu.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/eu.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/fa.f4242d89d489.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/fa.f4242d89d489.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/fa.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/fa.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/fa_IR.5685ed5d5659.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/fa_IR.5685ed5d5659.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/fa_IR.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/fa_IR.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/fi.9b229553958c.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/fi.9b229553958c.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/fi.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/fi.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/fr_FR.39a6068252db.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/fr_FR.39a6068252db.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/fr_FR.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/fr_FR.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/gl.4c87b5345d76.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/gl.4c87b5345d76.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/gl.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/gl.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/he_IL.ab3335919ec5.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/he_IL.ab3335919ec5.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/he_IL.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/he_IL.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/hr.ab6217dad69a.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/hr.ab6217dad69a.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/hr.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/hr.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/hu_HU.2afccb31e0cd.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/hu_HU.2afccb31e0cd.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/hu_HU.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/hu_HU.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/id.804ca5c83b16.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/id.804ca5c83b16.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/id.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/id.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/it.4c03cbd78f5e.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/it.4c03cbd78f5e.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/it.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/it.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/it_IT.f5f75ba5738d.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/it_IT.f5f75ba5738d.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/it_IT.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/it_IT.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ja.7199e3d23618.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ja.7199e3d23618.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ja.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ja.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/kab.2d4bcfaaedf5.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/kab.2d4bcfaaedf5.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/kab.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/kab.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/kk.bb3d174d36f8.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/kk.bb3d174d36f8.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/kk.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/kk.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ko_KR.44fb5d6e154b.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ko_KR.44fb5d6e154b.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ko_KR.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ko_KR.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/lt.b359a6a5f28a.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/lt.b359a6a5f28a.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/lt.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/lt.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/nb_NO.0a7352214f0c.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/nb_NO.0a7352214f0c.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/nb_NO.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/nb_NO.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/nl.6f571210666a.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/nl.6f571210666a.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/nl.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/nl.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/nl_BE.fa016cc8afd2.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/nl_BE.fa016cc8afd2.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/nl_BE.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/nl_BE.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/pl.e250adf7e075.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/pl.e250adf7e075.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/pl.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/pl.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/pt_BR.cc070dfc8935.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/pt_BR.cc070dfc8935.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/pt_BR.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/pt_BR.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/pt_PT.4dd1d7b30c2f.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/pt_PT.4dd1d7b30c2f.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/pt_PT.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/pt_PT.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/readme.a803b8446c1c.md
- No issues detected by automated scan.

### staticfiles/tinymce/langs/readme.a803b8446c1c.md.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/readme.md
- No issues detected by automated scan.

### staticfiles/tinymce/langs/readme.md.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ro.e23437166aef.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ro.e23437166aef.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ro.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ro.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ro_RO.270de6be564b.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ro_RO.270de6be564b.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ro_RO.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ro_RO.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ru.511a44e58e8f.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ru.511a44e58e8f.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ru.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ru.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ru_RU.1bebc20b01dc.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ru_RU.1bebc20b01dc.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ru_RU.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ru_RU.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/sk.1b3c7faef9a1.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/sk.1b3c7faef9a1.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/sk.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/sk.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/sl.e70856ec865c.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/sl.e70856ec865c.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/sl.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/sl.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/sl_SI.3de18771671f.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/sl_SI.3de18771671f.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/sl_SI.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/sl_SI.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/sq.556fae3040b7.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/sq.556fae3040b7.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/sq.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/sq.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/sv_SE.ed26794df73a.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/sv_SE.ed26794df73a.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/sv_SE.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/sv_SE.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ta.28baeda3ba8a.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ta.28baeda3ba8a.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ta.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ta.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ta_IN.c245824dc4a0.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ta_IN.c245824dc4a0.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ta_IN.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ta_IN.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/th_TH.5f149677f730.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/th_TH.5f149677f730.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/th_TH.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/th_TH.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/tr.1d942271407e.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/tr.1d942271407e.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/tr.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/tr.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/tr_TR.21a6afe57b91.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/tr_TR.21a6afe57b91.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/tr_TR.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/tr_TR.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ug.e8d6f9642abb.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ug.e8d6f9642abb.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/ug.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/ug.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/uk.b7bc3cca339b.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/uk.b7bc3cca339b.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/uk.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/uk.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/zh_CN.c3ceccb2b20b.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/zh_CN.c3ceccb2b20b.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/zh_CN.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/zh_CN.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/zh_TW.8b3673b738b3.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/zh_TW.8b3673b738b3.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/langs/zh_TW.js
- No issues detected by automated scan.

### staticfiles/tinymce/langs/zh_TW.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/license.6f9589e0c8df.txt
- No issues detected by automated scan.

### staticfiles/tinymce/license.6f9589e0c8df.txt.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/license.txt
- No issues detected by automated scan.

### staticfiles/tinymce/license.txt.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/advlist/plugin.min.00d4fb9eca62.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/advlist/plugin.min.00d4fb9eca62.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/advlist/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/advlist/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/anchor/plugin.min.51c8b564e509.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/anchor/plugin.min.51c8b564e509.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/anchor/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/anchor/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/autolink/plugin.min.688b6d2b9127.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/autolink/plugin.min.688b6d2b9127.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/autolink/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/autolink/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/autoresize/plugin.min.8eaa32d783b8.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/autoresize/plugin.min.8eaa32d783b8.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/autoresize/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/autoresize/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/autosave/plugin.min.3b843a25997a.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/autosave/plugin.min.3b843a25997a.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/autosave/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/autosave/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/bbcode/plugin.min.0de6978244c6.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/bbcode/plugin.min.0de6978244c6.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/bbcode/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/bbcode/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/charmap/plugin.min.65bff85ca3d2.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/charmap/plugin.min.65bff85ca3d2.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/charmap/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/charmap/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/code/plugin.min.03cb9728521d.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/code/plugin.min.03cb9728521d.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/code/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/code/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/codesample/plugin.min.a62c33f44263.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/codesample/plugin.min.a62c33f44263.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/codesample/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/codesample/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/colorpicker/plugin.min.6af9ccbb69ae.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/colorpicker/plugin.min.6af9ccbb69ae.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/colorpicker/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/colorpicker/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/contextmenu/plugin.min.800529cd78b8.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/contextmenu/plugin.min.800529cd78b8.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/contextmenu/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/contextmenu/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/directionality/plugin.min.e65c75582939.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/directionality/plugin.min.e65c75582939.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/directionality/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/directionality/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/emoticons/js/emojiimages.b7c1a7f3d27f.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/emoticons/js/emojiimages.b7c1a7f3d27f.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/emoticons/js/emojiimages.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/emoticons/js/emojiimages.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/emoticons/js/emojiimages.min.cd8d1bac37c0.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/emoticons/js/emojiimages.min.cd8d1bac37c0.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/emoticons/js/emojiimages.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/emoticons/js/emojiimages.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/emoticons/js/emojis.a64de2c5911d.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/emoticons/js/emojis.a64de2c5911d.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/emoticons/js/emojis.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/emoticons/js/emojis.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/emoticons/js/emojis.min.1f434c25c9c5.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/emoticons/js/emojis.min.1f434c25c9c5.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/emoticons/js/emojis.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/emoticons/js/emojis.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/emoticons/plugin.min.805b1a75f7e7.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/emoticons/plugin.min.805b1a75f7e7.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/emoticons/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/emoticons/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/fullpage/plugin.min.e112d3dfe5d7.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/fullpage/plugin.min.e112d3dfe5d7.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/fullpage/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/fullpage/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/fullscreen/plugin.min.ab4d40eafaae.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/fullscreen/plugin.min.ab4d40eafaae.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/fullscreen/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/fullscreen/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/help/plugin.min.e850841efa18.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/help/plugin.min.e850841efa18.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/help/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/help/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/hr/plugin.min.5845ce5d6810.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/hr/plugin.min.5845ce5d6810.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/hr/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/hr/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/image/plugin.min.25569ff5318e.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/image/plugin.min.25569ff5318e.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/image/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/image/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/imagetools/plugin.min.c4fc736b272c.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/imagetools/plugin.min.c4fc736b272c.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/imagetools/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/imagetools/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/importcss/plugin.min.6f4dcbab4b3d.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/importcss/plugin.min.6f4dcbab4b3d.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/importcss/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/importcss/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/insertdatetime/plugin.min.f0af49525ab2.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/insertdatetime/plugin.min.f0af49525ab2.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/insertdatetime/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/insertdatetime/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/legacyoutput/plugin.min.2bfd4f7c2da6.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/legacyoutput/plugin.min.2bfd4f7c2da6.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/legacyoutput/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/legacyoutput/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/link/plugin.min.e7d251e412ab.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/link/plugin.min.e7d251e412ab.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/link/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/link/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/lists/plugin.min.43ff6a7cc605.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/lists/plugin.min.43ff6a7cc605.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/lists/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/lists/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/nonbreaking/plugin.min.f12177e27c51.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/nonbreaking/plugin.min.f12177e27c51.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/nonbreaking/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/nonbreaking/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/noneditable/plugin.min.c5a318661439.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/noneditable/plugin.min.c5a318661439.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/noneditable/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/noneditable/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/pagebreak/plugin.min.3485a93077a1.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/pagebreak/plugin.min.3485a93077a1.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/pagebreak/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/pagebreak/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/paste/plugin.min.180f860cb760.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/paste/plugin.min.180f860cb760.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/paste/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/paste/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/preview/plugin.min.fe3b4c80e4d3.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/preview/plugin.min.fe3b4c80e4d3.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/preview/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/preview/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/print/plugin.min.94afd11638c1.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/print/plugin.min.94afd11638c1.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/print/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/print/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/quickbars/plugin.min.bdb219a6d7c5.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/quickbars/plugin.min.bdb219a6d7c5.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/quickbars/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/quickbars/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/save/plugin.min.6c67d5cd7139.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/save/plugin.min.6c67d5cd7139.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/save/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/save/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/searchreplace/plugin.min.5d4a944aa401.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/searchreplace/plugin.min.5d4a944aa401.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/searchreplace/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/searchreplace/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/spellchecker/plugin.min.11845dcff2a4.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/spellchecker/plugin.min.11845dcff2a4.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/spellchecker/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/spellchecker/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/tabfocus/plugin.min.460dcde02a59.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/tabfocus/plugin.min.460dcde02a59.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/tabfocus/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/tabfocus/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/table/plugin.min.c9841e9586e5.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/table/plugin.min.c9841e9586e5.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/table/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/table/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/template/plugin.min.8294e3b027a6.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/template/plugin.min.8294e3b027a6.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/template/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/template/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/textcolor/plugin.min.e76782136bc8.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/textcolor/plugin.min.e76782136bc8.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/textcolor/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/textcolor/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/textpattern/plugin.min.6fe95078adbe.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/textpattern/plugin.min.6fe95078adbe.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/textpattern/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/textpattern/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/toc/plugin.min.79d5412d0b3b.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/toc/plugin.min.79d5412d0b3b.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/toc/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/toc/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/visualblocks/plugin.min.73b4d8fd6e15.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/visualblocks/plugin.min.73b4d8fd6e15.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/visualblocks/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/visualblocks/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/visualchars/plugin.min.5cdf1a80c304.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/visualchars/plugin.min.5cdf1a80c304.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/visualchars/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/visualchars/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/wordcount/plugin.min.9cb72147e694.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/wordcount/plugin.min.9cb72147e694.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/plugins/wordcount/plugin.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/plugins/wordcount/plugin.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/content/dark/content.min.4c0b8cf274d1.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/content/dark/content.min.4c0b8cf274d1.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/content/dark/content.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/content/dark/content.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/content/default/content.min.5022f9908e1f.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/content/default/content.min.5022f9908e1f.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/content/default/content.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/content/default/content.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/content/document/content.min.0ccaf40378ed.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/content/document/content.min.0ccaf40378ed.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/content/document/content.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/content/document/content.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/content/writer/content.min.856c1120d71e.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/content/writer/content.min.856c1120d71e.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/content/writer/content.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/content/writer/content.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.inline.min.22d0980afc1f.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.inline.min.22d0980afc1f.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.inline.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.inline.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.min.23903b9d6f5e.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.min.23903b9d6f5e.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.mobile.min.411c2608b6be.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.mobile.min.411c2608b6be.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.mobile.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/content.mobile.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/fonts/tinymce-mobile.baecf466c40e.woff
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/fonts/tinymce-mobile.woff
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.min.9e3824fbdfc2.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.min.9e3824fbdfc2.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.mobile.min.a2bbc33fbb7a.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.mobile.min.a2bbc33fbb7a.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.mobile.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.mobile.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.shadowdom.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.shadowdom.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.shadowdom.min.e27cb72c7ae5.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide-dark/skin.shadowdom.min.e27cb72c7ae5.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/content.inline.min.22d0980afc1f.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/content.inline.min.22d0980afc1f.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/content.inline.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/content.inline.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/content.min.6de47628a73e.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/content.min.6de47628a73e.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/content.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/content.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/content.mobile.min.411c2608b6be.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/content.mobile.min.411c2608b6be.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/content.mobile.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/content.mobile.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/fonts/tinymce-mobile.baecf466c40e.woff
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/fonts/tinymce-mobile.woff
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/skin.min.40292756e45a.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/skin.min.40292756e45a.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/skin.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/skin.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/skin.mobile.min.a2bbc33fbb7a.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/skin.mobile.min.a2bbc33fbb7a.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/skin.mobile.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/skin.mobile.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/skin.shadowdom.min.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/skin.shadowdom.min.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/skins/ui/oxide/skin.shadowdom.min.e27cb72c7ae5.css
- No issues detected by automated scan.

### staticfiles/tinymce/skins/ui/oxide/skin.shadowdom.min.e27cb72c7ae5.css.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/themes/mobile/theme.min.637f25ef532f.js
- No issues detected by automated scan.

### staticfiles/tinymce/themes/mobile/theme.min.637f25ef532f.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/themes/mobile/theme.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/themes/mobile/theme.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/themes/silver/theme.min.b84a8ffecd2b.js
- No issues detected by automated scan.

### staticfiles/tinymce/themes/silver/theme.min.b84a8ffecd2b.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/themes/silver/theme.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/themes/silver/theme.min.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/tinymce.d.23fc47c13998.ts
- No issues detected by automated scan.

### staticfiles/tinymce/tinymce.d.23fc47c13998.ts.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/tinymce.d.ts
- No issues detected by automated scan.

### staticfiles/tinymce/tinymce.d.ts.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/tinymce.min.41e027f3a3ea.js
- No issues detected by automated scan.

### staticfiles/tinymce/tinymce.min.41e027f3a3ea.js.gz
- Binary file; skipped text scan.

### staticfiles/tinymce/tinymce.min.js
- No issues detected by automated scan.

### staticfiles/tinymce/tinymce.min.js.gz
- Binary file; skipped text scan.

### templates/sw.js
- No issues detected by automated scan.


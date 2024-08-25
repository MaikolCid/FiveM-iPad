fx_version 'cerulean'
game 'gta5'

lua54 'yes'

client_scripts {
    'client/*.lua'
}

shared_scripts {
    '@ox_lib/init.lua',
    '@es_extended/imports.lua',
}

server_scripts {
    'server/*.lua',
    '@oxmysql/lib/MySQL.lua',
}

ui_page {
    'html/index.html'
}

files {
    'html/index.html',
    'html/aplicaciones/*.html',
    'html/css/*.css',
    'html/images/apps-imgs/*.*',
    'html/images/fondos/*.*',
    'html/images/*.*',
    'html/js/*.js',
    'html/normativas/*.pdf',
    'html/widget-musica/icon/*.*',
    'html/widget-musica/img/*.*',
    'html/widget-musica/songs/*.*',
}
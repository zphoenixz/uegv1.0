$(document).on('click', '.navbar-toggle', function () {
    $toggle = $(this);

    if (nowuiDashboard.misc.navbar_menu_visible == 1) 
    {
        $('html').removeClass('nav-open');
        nowuiDashboard.misc.navbar_menu_visible = 0;
        
    } else {
        div = '<div id="bodyClick"></div>';
        $('html').addClass('nav-open');
        nowuiDashboard.misc.navbar_menu_visible = 1;
    }
});

nowuiDashboard = 
{
    misc: {
        navbar_menu_visible: 0
    },
    initMinimizeSidebar: function initMinimizeSidebar() 
    {        
        $('#minimizeSidebar').click(function () 
        {
            var $btn = $(this);
            if (sidebar_mini_active == true) {
                $('body').removeClass('sidebar-mini');
                sidebar_mini_active = false;
            } else {
                $('body').addClass('sidebar-mini');
                sidebar_mini_active = true;
            }

        });
    },
}

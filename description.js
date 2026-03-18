function iOSVersion() {
    var match = (navigator.appVersion).split('OS ');
    if (match.length > 1) {
        return match[1].split(' ')[0].split('_').join('.');
    }
    return false;
}

$(function() {
    $("li").on("click", function() {
        if(this.id == "dnt") {
            $("#dnt_txt").html("You can donate USD via PayPal mail: julioverne" + "@" + "icloud.com");
        }
    });
});

function loadPackageInfo() {
    if (navigator.userAgent.search(/Cydia/) == -1) {
        $("#showAddRepo_").show();
        $("#showAddRepoUrl_").show();
    }
    
    var urlSelfParts = window.location.href.split('description.html?id=');
    if (urlSelfParts.length < 2) {
        $("#errorInfo").html("Invalid package ID");
        return;
    }
    
    var packageId = urlSelfParts[1];
    var form_url = urlSelfParts[0] + "packageInfo/" + encodeURIComponent(packageId);
    
    $.ajax({
        url: form_url,
        type: "GET",
        dataType: "json",  // ✅ Thêm dataType để tự động parse JSON
        cache: false,
        crossDomain: true,
        success: function(data) {  // ✅ Không cần eval nữa
            $("#tweakStatusInfo").hide();
            
            // Kiểm tra dữ liệu hợp lệ
            if (!data || typeof data !== 'object') {
                $("#errorInfo").html("Invalid package data");
                return;
            }
            
            if(data.name) {
                document.title = data.name;
                $("#name").html(data.name);
                $("#name").show();
            }
            if(data.desc_short) {
                $("#desc_short").html(data.desc_short);
                $("#desc_short_").show();
            }
            if(data.warning) {
                $("#warning").html(data.warning);
                $("#warning_").show();
            }
            if(data.desc_long) {
                $("#desc_long").html(data.desc_long);
                $("#desc_long_").show();
            }
            if(data.compatitle) {
                $("#compatitle").html(data.compatitle);
                $("#compatitle_").show();
                var ios_ver = iOSVersion();
                if(ios_ver) {
                    $("#your_ios").show();
                    $("#your_ios").html("Current iOS: " + ios_ver);
                }
            }
            if(data.changelog) {
                $("#changelog").html(data.changelog);
                $("#changelog_").show();
            }
            if(data.screenshot) {
                $("#screenshot").html(data.screenshot);
                $("#screenshot_").show();
            }
            if(data.open == true) {
                $("#is_open_source_").show();
            }
        },
        error: function(xhr, status, error) {
            $("#errorInfo").html("Mô tả không có sẵn cho " + packageId);
            console.error("Error loading package:", error);
        }
    });
}

function loadRecentUpdates() {
    var form_url = window.location.protocol + "//" + window.location.hostname + "/last.updates";
    
    $.ajax({
        url: form_url,
        type: "GET",
        dataType: "json",  // ✅ Thêm dataType
        cache: false,
        crossDomain: true,
        success: function(data) {  // ✅ Không dùng eval
            // Kiểm tra dữ liệu
            if (!data || !Array.isArray(data)) {
                $("#updates_").hide();
                return;
            }
            
            var htmlnews = "";
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var urlOpen = "cydia://package/" + encodeURIComponent(item.package);
                
                if (navigator.userAgent.search(/Cydia/) == -1) {
                    urlOpen = window.location.protocol + "//" + window.location.hostname + "/description.html?id=" + encodeURIComponent(item.package);
                }
                
                htmlnews += "<li><a href='" + urlOpen + "' target='_blank'>" +
                           "<img class='icon' src='tweak.png'/>" +
                           "<label>" + (item.name || item.package) + " v" + (item.version || "?") + "</label>" +
                           "</a></li>";
            }
            
            $("#updates").html(htmlnews);
            $("#updates_").show();            
        },
        error: function(xhr, status, error) {
            console.error("Error loading updates:", error);
            $("#updates_").hide();    
        }
    });
}

// Tự động load khi trang sẵn sàng
$(document).ready(function() {
    loadPackageInfo();
    loadRecentUpdates();
});
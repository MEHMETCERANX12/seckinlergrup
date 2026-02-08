function navbar()
{
    const $navbar    = $("#navbar");
    const $hamburger = $("#hamburger");
    const $drop1     = $("#drop1");

    /* HAMBURGER */
    if ($hamburger.length)
    {
        $hamburger.on("click", function (e)
        {
            e.stopPropagation();
            $navbar.toggleClass("open");
        });
    }

    /* DROPDOWN BUTTON */
    if ($drop1.length)
    {
        $drop1.find(".dropbtn").on("click", function (e)
        {
            e.stopPropagation();
            $drop1.toggleClass("open");
        });

        /* 🔥 DROPDOWN MENU TIKLARI */
        $drop1.find(".dropdown-menu").on("click", function (e)
        {
            e.stopPropagation();
        });
    }

    /* SAYFA DIŞI TIK */
    $(document).on("click", function ()
    {
        if ($drop1.length) $drop1.removeClass("open");
        if ($navbar.length) $navbar.removeClass("open");
    });

    /* ESC TUŞU */
    $(document).on("keydown", function (e)
    {
        if (e.key === "Escape")
        {
            if ($drop1.length) $drop1.removeClass("open");
            if ($navbar.length) $navbar.removeClass("open");
        }
    });
}

function yazi()
{
    const jsonStr = $('#HiddenField1').val()?.trim();
    if (!jsonStr) return;
    let data;
    try
    {
        data = JSON.parse(jsonStr);
    }
    catch (e)
    {
        console.error("JSON parse hatası", e);
        return;
    }
    const $wrapper = $('.danismanlik-card');
    $wrapper.empty();
    data.forEach(item =>
    {
        const icerik = item.icerik || "";
        const stil = item.stil;
        if (stil === "1")
        {
            $wrapper.append($('<div>').addClass('baslikgirintili').text(icerik));//Baslik
        }
        else if (stil === "2")
        {
            $wrapper.append($('<div>').addClass('normalyasli').text(icerik));//Normal Yaslı
        }
        else if (stil === "3")
        {
            $wrapper.append($('<div>').addClass('kirmiziyasli').text(icerik));//Kırmızı Yaslı
        }
    });
}

function slide()
{
    const jsonStr = $('#HiddenField1').val()?.trim();
    if (!jsonStr) return;

    let data;
    try
    {
        data = JSON.parse(jsonStr);
    }
    catch
    {
        return;
    }

    const BASE_IMG_URL = "https://cdn.jsdelivr.net/gh/MEHMETCERANX12/seckinlergrup@main/resimx/";
    const DEFAULT_IMG  = BASE_IMG_URL + "1.jpg";

    const $slides = $(".slide");
    const $items  = $(".news-item");
    const $bars   = $(".progress span");

    data.slice(0, 7).forEach((row, i) =>
    {
        if (!$slides.eq(i).length) return;

        const base = i * 5;
        for (let j = 1; j <= 5; j++)
        {
            $('#x' + (base + j)).text(row['x' + j] || '');
        }

        if (row.id)
        {
            const link = 'yazi.aspx?id=' + encodeURIComponent(row.id);
            $slides.eq(i)
                .attr('data-href', link)
                .css('cursor', 'pointer');

            $slides.eq(i).find('a').attr('href', link);
        }

        let imgUrl = DEFAULT_IMG;
        if (row.resim && row.resim > 0)
        {
            imgUrl = BASE_IMG_URL + row.resim + ".jpg";
        }

        $slides.eq(i).css("background-image", "url('" + imgUrl + "')");
    });

    $(".slide").off("click").on("click", function (e)
    {
        if ($(e.target).closest("a").length) return;
        const link = $(this).data("href");
        if (link) window.location.href = link;
    });

    let index = 0;
    const duration = 7000;
    let startTime = null;
    let anim;

    function startProgress()
    {
        $bars.css("width", "0%");
        startTime = null;
        cancelAnimationFrame(anim);
        anim = requestAnimationFrame(progressStep);
    }

    function progressStep(timestamp)
    {
        if (!startTime) startTime = timestamp;

        const progress = timestamp - startTime;
        const percent = Math.min((progress / duration) * 100, 100);

        $bars.eq(index).css("width", percent + "%");

        if (progress < duration)
        {
            anim = requestAnimationFrame(progressStep);
        }
        else
        {
            goSlide((index + 1) % $slides.length);
        }
    }

    function goSlide(i)
    {
        if (!$slides.length) return;

        $slides.removeClass("active");
        $items.removeClass("active");
        $bars.css("width", "0%");

        index = i;

        $slides.eq(index).addClass("active");
        $items.eq(index).addClass("active");

        startProgress();
    }

    window.goSlide = goSlide;
    startProgress();
}




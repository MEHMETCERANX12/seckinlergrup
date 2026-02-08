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
    try { data = JSON.parse(jsonStr); }
    catch { return; }

    const BASE_IMG = "https://cdn.jsdelivr.net/gh/MEHMETCERANX12/seckinlergrup@main/resimx/";
    const DEFAULT_IMG = BASE_IMG + "1.jpg";

    const $slides = $(".slide");
    const $items  = $(".news-item");
    const $bars   = $(".progress span");

    /* ===== VERİ BAS ===== */
    data.slice(0, 7).forEach((row, i) =>
    {
        const $slide = $slides.eq(i);
        if (!$slide.length) return;

        const base = i * 5;
        for (let j = 1; j <= 5; j++)
        {
            $('#x' + (base + j)).text(row['x' + j] || '');
        }

        const link = row.id
            ? 'yazi.aspx?id=' + encodeURIComponent(row.id)
            : '#';

        $slide.find('.slide-link').attr('href', link);
        $slide.find('.slide-overlay').attr('href', link);

        const img = row.resim > 0
            ? BASE_IMG + row.resim + ".jpg"
            : DEFAULT_IMG;

        $slide.css("background-image", "url('" + img + "')");
    });

    /* ===== ANİMASYON ===== */
    let index = 0;
    const duration = 7000;
    let startTime = null;
    let anim;

    function startProgress()
    {
        $bars.css("width", "0%");
        startTime = null;
        cancelAnimationFrame(anim);
        anim = requestAnimationFrame(step);
    }

    function step(ts)
    {
        if (!startTime) startTime = ts;
        const p = Math.min(((ts - startTime) / duration) * 100, 100);
        $bars.eq(index).css("width", p + "%");

        if (p < 100) anim = requestAnimationFrame(step);
        else goSlide((index + 1) % $slides.length);
    }

    function goSlide(i)
    {
        $slides.removeClass("active");
        $items.removeClass("active");
        $bars.css("width", "0%");

        index = i;
        $slides.eq(i).addClass("active");
        $items.eq(i).addClass("active");
        startProgress();
    }

    window.goSlide = goSlide;
    startProgress();
}






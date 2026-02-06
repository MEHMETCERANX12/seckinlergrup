function navbar()
{
    const $navbar    = $("#navbar");
    const $hamburger = $("#hamburger");
    const $drop1     = $("#drop1");
    if ($hamburger.length)
    {
        $hamburger.on("click", function (e)
        {
            e.stopPropagation();
            $navbar.toggleClass("open");
        });
    }
    if ($drop1.length)
    {
        $drop1.find(".dropbtn").on("click", function (e)
        {
            e.stopPropagation();
            $drop1.toggleClass("open");
        });
    }
    $(document).on("click", function ()
    {
        if ($drop1.length) $drop1.removeClass("open");
        if ($navbar.length) $navbar.removeClass("open");
    });
    $(document).on("keydown", function (e)
    {
        if (e.key === "Escape")
        {
            if ($drop1.length) $drop1.removeClass("open");
            if ($navbar.length) $navbar.removeClass("open");
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
    catch (e)
    {
        console.error("JSON parse hatası", e);
        return;
    }

    /* VERİ BASMA */
    data.slice(0, 7).forEach((row, i) =>
    {
        const base = i * 5;
        for (let j = 1; j <= 5; j++)
        {
            $('#x' + (base + j)).text(row['x' + j] || '');
        }

        $('.slide').eq(i)
            .find('a')
            .attr('href', 'yazi.aspx?id=' + encodeURIComponent(row.id));
    });

    let index = 0;
    const $slides = $(".slide");
    const $items  = $(".news-item");
    const $bars   = $(".progress span");
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
        const percent  = Math.min((progress / duration) * 100, 100);

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

        $slides.eq(index).removeClass("active");
        $items.eq(index).removeClass("active");
        $bars.eq(index).css("width", "0%");

        index = i;

        $slides.eq(index).addClass("active");
        $items.eq(index).addClass("active");

        startProgress();
    }
    window.goSlide = goSlide; // dışarıdan tıklama için
    startProgress();
}

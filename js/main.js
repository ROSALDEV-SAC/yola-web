/* ═══════════════════════════════════════════════════════
   YOLA OS — MAIN JS v10.0
   Shared: cursor, scroll, nav, reveal, mobile nav.
   ═══════════════════════════════════════════════════════ */

/* ─── TOUCH DEVICE: disable custom cursor ──────────── */
(function(){
    var isTouch = window.matchMedia && window.matchMedia('(pointer:coarse)').matches;
    if(!isTouch) return;
    var c = document.getElementById('c');
    var cr = document.getElementById('cr');
    if(c) c.remove();
    if(cr) cr.remove();
    document.documentElement.style.cursor = 'auto';
    document.body.style.cursor = 'auto';
    var style = document.createElement('style');
    style.textContent = '*,*::before,*::after{cursor:auto!important}';
    document.head.appendChild(style);
})();

/* ─── CURSOR TRACKING (desktop only) ───────────────── */
(function(){
    var isTouch = window.matchMedia && window.matchMedia('(pointer:coarse)').matches;
    if(isTouch) return;
    var cur = document.getElementById('c');
    var ring = document.getElementById('cr');
    if(!cur || !ring) return;
    var mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function(e){
        mx = e.clientX;
        my = e.clientY;
        cur.style.transform = 'translate(' + (mx - 3) + 'px,' + (my - 3) + 'px)';
    });

    (function animRing(){
        rx += (mx - rx - 14) * .1;
        ry += (my - ry - 14) * .1;
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
        requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a,button,.nav-pill,.btn,.btn-nav,.cat-btn,.filter-btn,.fb-upvote,.share-btn,.detect-btn,.btn-submit').forEach(function(el){
        el.addEventListener('mouseenter', function(){ ring.classList.add('h'); });
        el.addEventListener('mouseleave', function(){ ring.classList.remove('h'); });
    });
})();

/* ─── SCROLL PROGRESS BAR ──────────────────────────── */
(function(){
    var bar = document.getElementById('scrollProgress');
    if(!bar) return;
    function update(){
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', update, {passive: true});
    update();
})();

/* ─── NAV SCROLL STATE ─────────────────────────────── */
(function(){
    var nav = document.getElementById('mainNav');
    if(!nav) return;
    window.addEventListener('scroll', function(){
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }, {passive: true});
})();

/* ─── MOBILE NAV (hamburger) ───────────────────────── */
(function(){
    var toggle = document.getElementById('navToggle');
    var navR = document.querySelector('.nav-r');
    var overlay = document.getElementById('navOverlay');
    if(!toggle || !navR) return;

    function closeNav(){
        toggle.classList.remove('active');
        navR.classList.remove('open');
        if(overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    function openNav(){
        toggle.classList.add('active');
        navR.classList.add('open');
        if(overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', function(){
        if(navR.classList.contains('open')) closeNav();
        else openNav();
    });

    if(overlay) overlay.addEventListener('click', closeNav);

    // Close on nav-pill click
    navR.querySelectorAll('.nav-pill').forEach(function(pill){
        pill.addEventListener('click', closeNav);
    });

    // Close on resize to desktop
    window.addEventListener('resize', function(){
        if(window.innerWidth > 900) closeNav();
    });
})();

/* ─── REVEAL ANIMATIONS ────────────────────────────── */
(function(){
    var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
            if(e.isIntersecting){
                e.target.classList.add('in');
                obs.unobserve(e.target);
            }
        });
    }, {threshold: .1});
    document.querySelectorAll('.rv').forEach(function(el){ obs.observe(el); });
})();

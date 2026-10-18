"use strict";

function removeLocationHash() {
  if (!window.location.hash) return;

  const urlWithoutHash = window.location.href.slice(0, -window.location.hash.length);
  window.history.replaceState(window.history.state, "", urlWithoutHash);
}

function scrollToTopInstantly() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.setProperty("scroll-behavior", "auto", "important");
  window.scrollTo(0, 0);
  root.scrollTop = 0;
  document.body.scrollTop = 0;

  requestAnimationFrame(() => {
    root.style.scrollBehavior = previousScrollBehavior;
  });
}

function initializePagePosition() {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  removeLocationHash();
  scrollToTopInstantly();
  window.addEventListener("load", scrollToTopInstantly, { once: true });
}

function initializeInternalNavigation() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      let targetId;

      try {
        targetId = decodeURIComponent(link.hash.slice(1));
      } catch {
        return;
      }

      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      removeLocationHash();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      if (link.classList.contains("skip-link")) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }
    });
  });
}

// Oficjalny wykaz PTT: https://www.ptt.org.pl/odznaka-turystyczna-korona-tatr/
const places = Object.freeze([
  { id: 1, name: "Rysy", height: 2503, country: "SK", type: "szczyt" },
  { id: 2, name: "Rysy", height: 2499, country: "PL", type: "szczyt" },
  { id: 3, name: "Krywań", height: 2494, country: "SK", type: "szczyt" },
  { id: 4, name: "Sławkowski Szczyt", height: 2452, country: "SK", type: "szczyt" },
  { id: 5, name: "Mała Wysoka", height: 2429, country: "SK", type: "szczyt" },
  { id: 6, name: "Lodowa Przełęcz", height: 2372, country: "SK", type: "przelecz" },
  { id: 7, name: "Koprowy Wierch", height: 2367, country: "SK", type: "szczyt" },
  { id: 8, name: "Czerwona Ławka", height: 2352, country: "SK", type: "przelecz" },
  { id: 9, name: "Bystry Przechód", height: 2314, country: "SK", type: "przelecz" },
  { id: 10, name: "Przełęcz pod Chłopkiem", height: 2307, country: "PL", type: "przelecz" },
  { id: 11, name: "Świnica", height: 2301, country: "PL", type: "szczyt" },
  { id: 12, name: "Kozi Wierch", height: 2291, country: "PL", type: "szczyt" },
  { id: 13, name: "Rohatka", height: 2288, country: "SK", type: "przelecz" },
  { id: 14, name: "Kozie Czuby", height: 2266, country: "PL", type: "szczyt" },
  { id: 15, name: "Bystra", height: 2248, country: "SK", type: "szczyt" },
  { id: 16, name: "Zadni Granat", height: 2240, country: "PL", type: "szczyt" },
  { id: 17, name: "Pośredni Granat", height: 2234, country: "PL", type: "szczyt" },
  { id: 18, name: "Jagnięcy Szczyt", height: 2229, country: "SK", type: "szczyt" },
  { id: 19, name: "Mały Kozi Wierch", height: 2228, country: "PL", type: "szczyt" },
  { id: 20, name: "Skrajny Granat", height: 2225, country: "PL", type: "szczyt" },
  { id: 21, name: "Raczkowa Czuba", height: 2194, country: "SK", type: "szczyt" },
  { id: 22, name: "Baraniec", height: 2184, country: "SK", type: "szczyt" },
  { id: 23, name: "Banówka", height: 2178, country: "SK", type: "szczyt" },
  { id: 24, name: "Starorobociański Wierch", height: 2176, country: "PL", type: "szczyt" },
  { id: 25, name: "Szpiglasowy Wierch", height: 2172, country: "PL", type: "szczyt" },
  { id: 26, name: "Pachola", height: 2166, country: "SK", type: "szczyt" },
  { id: 27, name: "Hruba Kopa", height: 2163, country: "SK", type: "szczyt" },
  { id: 28, name: "Błyszcz", height: 2159, country: "PL", type: "szczyt" },
  { id: 29, name: "Kościelec", height: 2155, country: "PL", type: "szczyt" },
  { id: 30, name: "Trzy Kopy", height: 2150, country: "SK", type: "szczyt" },
  { id: 31, name: "Wyżni Przysłop", height: 2145, country: "SK", type: "szczyt" },
  { id: 32, name: "Jarząbczy Wierch", height: 2137, country: "PL", type: "szczyt" },
  { id: 33, name: "Rohacz Płaczliwy", height: 2126, country: "SK", type: "szczyt" },
  { id: 34, name: "Krzesanica", height: 2122, country: "PL", type: "szczyt" },
  { id: 35, name: "Skrajne Solisko", height: 2117, country: "SK", type: "szczyt" },
  { id: 36, name: "Małołączniak", height: 2096, country: "PL", type: "szczyt" },
  { id: 37, name: "Ciemniak", height: 2096, country: "PL", type: "szczyt" },
  { id: 38, name: "Rohacz Ostry", height: 2088, country: "SK", type: "szczyt" },
  { id: 39, name: "Spalona", height: 2083, country: "SK", type: "szczyt" },
  { id: 40, name: "Smrek", height: 2089, country: "SK", type: "szczyt" },
  { id: 41, name: "Wołowiec", height: 2064, country: "PL", type: "szczyt" },
  { id: 42, name: "Salatyn", height: 2050, country: "SK", type: "szczyt" },
  { id: 43, name: "Rakuska Czuba", height: 2037, country: "SK", type: "szczyt" },
  { id: 44, name: "Wrota Chałubińskiego", height: 2022, country: "PL", type: "przelecz" },
  { id: 45, name: "Beskid", height: 2012, country: "PL", type: "szczyt" },
  { id: 46, name: "Kopa Kondracka", height: 2005, country: "PL", type: "szczyt" },
  { id: 47, name: "Kończysty Wierch", height: 2002, country: "PL", type: "szczyt" },
  { id: 48, name: "Kasprowy Wierch", height: 1987, country: "PL", type: "szczyt" },
  { id: 49, name: "Osterwa", height: 1984, country: "SK", type: "szczyt" },
  { id: 50, name: "Brestowa", height: 1934, country: "SK", type: "szczyt" },
  { id: 51, name: "Giewont", height: 1895, country: "PL", type: "szczyt" },
  { id: 52, name: "Rakoń", height: 1879, country: "PL", type: "szczyt" },
  { id: 53, name: "Świstowa Czuba", height: 1763, country: "PL", type: "szczyt" },
  { id: 54, name: "Ornak", height: 1854, country: "PL", type: "szczyt" },
  { id: 55, name: "Siwy Wierch", height: 1805, country: "SK", type: "szczyt" },
  { id: 56, name: "Trzydniowiański Wierch", height: 1758, country: "PL", type: "szczyt" },
  { id: 57, name: "Grześ", height: 1653, country: "PL", type: "szczyt" },
  { id: 58, name: "Gęsia Szyja", height: 1489, country: "PL", type: "szczyt" },
  { id: 59, name: "Wielki Kopieniec", height: 1328, country: "PL", type: "szczyt" },
  { id: 60, name: "Nosal", height: 1206, country: "PL", type: "szczyt" },
]);

// Dodaj numery pozycji do odpowiedniej listy, gdy potwierdzimy Wasze dotychczasowe wejścia.
const completedPlaces = {
  mateusz: new Set([1, 11, 25, 48, 58, 59, 60]),
  artur: new Set([11, 48, 51, 58, 59]),
};

const gesiaSzyjaPhotos = Object.freeze([
  Object.freeze({
    src: "assets/MK/Gęsia Szyja/1.webp",
    width: 3072,
    height: 3072,
    alt: "Drogowskaz zielonego szlaku prowadzącego na Rusinową Polanę i Gęsią Szyję",
    caption: "Początek szlaku na Gęsią Szyję",
  }),
  Object.freeze({
    src: "assets/MK/Gęsia Szyja/2.webp",
    width: 2252,
    height: 2252,
    alt: "Wędrowiec na leśnym szlaku z widokiem na tatrzańskie szczyty",
    caption: "W drodze na Rusinową Polanę",
  }),
  Object.freeze({
    src: "assets/MK/Gęsia Szyja/3.webp",
    width: 3072,
    height: 3072,
    alt: "Mateusz na Rusinowej Polanie z panoramą Tatr w tle",
    caption: "Na Rusinowej Polanie",
  }),
  Object.freeze({
    src: "assets/MK/Gęsia Szyja/4.webp",
    width: 3072,
    height: 3072,
    alt: "Kamienisty szlak wśród jesiennej roślinności z panoramą Tatr",
    caption: "Podejście na Gęsią Szyję",
  }),
  Object.freeze({
    src: "assets/MK/Gęsia Szyja/5.webp",
    width: 2252,
    height: 2252,
    alt: "Trzech uczestników wyprawy na skalistym szczycie z kartką z nazwą Gęsia Szyja",
    caption: "Na szczycie Gęsiej Szyi",
  }),
]);

const arturKasprowyPhotos = Object.freeze([
  Object.freeze({
    src: "assets/AU/Kasprowy Wierch/1.webp",
    width: 2048,
    height: 2048,
    alt: "Uczestnicy wyprawy na kamiennym zielonym szlaku w porannym cieniu, z widokiem na Zakopane",
    caption: "",
  }),
  Object.freeze({
    src: "assets/AU/Kasprowy Wierch/2.webp",
    width: 2048,
    height: 2048,
    alt: "Skaliste zbocza i turnie oświetlone porannym słońcem na podejściu na Kasprowy Wierch",
    caption: "",
  }),
  Object.freeze({
    src: "assets/AU/Kasprowy Wierch/3.webp",
    width: 2048,
    height: 2048,
    alt: "Widok ze szlaku na dolinę z wagonikiem kolejki linowej na Kasprowy Wierch",
    caption: "",
  }),
  Object.freeze({
    src: "assets/AU/Kasprowy Wierch/4.webp",
    width: 1536,
    height: 1536,
    alt: "Czterech uczestników wyprawy przy drogowskazie Kasprowy Wierch 1987 m n.p.m.",
    caption: "",
  }),
]);

const arturGesiaSzyjaPhotos = Object.freeze([
  Object.freeze({
    src: "assets/AU/Gęsia Szyja/1.webp",
    width: 2047,
    height: 2047,
    alt: "Artur na Rusinowej Polanie z panoramą Tatr Wysokich w tle",
    caption: "",
  }),
  Object.freeze({
    src: "assets/AU/Gęsia Szyja/2.webp",
    width: 2047,
    height: 2047,
    alt: "Turysta na skalnej turni wśród świerków z widokiem na Tatry Wysokie",
    caption: "",
  }),
  Object.freeze({
    src: "assets/AU/Gęsia Szyja/3.webp",
    width: 2047,
    height: 2047,
    alt: "Panorama tatrzańskiej doliny z jesiennie zabarwionymi lasami",
    caption: "",
  }),
  Object.freeze({
    src: "assets/AU/Gęsia Szyja/4.webp",
    width: 2032,
    height: 2032,
    alt: "Trzech uczestników wyprawy na szczycie z kartką z nazwą Gęsia Szyja 1489 m",
    caption: "",
  }),
]);

// Dodawaj tu wyłącznie potwierdzone wyprawy. Brak wpisu oznacza pusty katalog.
const profileEntries = Object.freeze({
  mateusz: Object.freeze({
    1: Object.freeze({
      date: "2025-07-14",
      page: "entries/mateusz/rysy-slowackie/index.html",
      route: Object.freeze({
        label: "Szczyrbskie Jezioro → czerwony szlak → Hotel Górski Popradzki Staw → niebieski szlak → Rozdroże nad Żabim Potokiem → czerwony szlak przez Wielki Żabi Staw Mięguszowiecki → Schronisko pod Rysami → Rysy",
        duration: "4:35 h",
        distanceKm: 10.3,
        ascentM: 1325,
        descentM: 157,
      }),
      photos: Object.freeze([
        Object.freeze({
          src: "assets/MK/Rysy Słowacja/1.webp",
          width: 9000,
          height: 9000,
          alt: "Widok na Tatry Wysokie ze szlaku na Rysy od słowackiej strony",
          caption: "Widok ze szlaku na Tatry Wysokie",
        }),
        Object.freeze({
          src: "assets/MK/Rysy Słowacja/2.webp",
          width: 9000,
          height: 9000,
          alt: "Kadr z wejścia na Rysy od słowackiej strony",
          caption: "Na szlaku ze Szczyrbskiego Jeziora",
        }),
        Object.freeze({
          src: "assets/MK/Rysy Słowacja/3.webp",
          width: 4096,
          height: 4096,
          alt: "Kadr z wejścia na Rysy od słowackiej strony",
          caption: "W drodze na Rysy",
        }),
        Object.freeze({
          src: "assets/MK/Rysy Słowacja/4.webp",
          width: 9000,
          height: 9000,
          alt: "Drogowskaz na Rozdrożu nad Żabim Potokiem",
          caption: "Rozdroże nad Żabim Potokiem",
        }),
        Object.freeze({
          src: "assets/MK/Rysy Słowacja/5.webp",
          width: 9000,
          height: 9000,
          alt: "Kadr z wejścia na Rysy od słowackiej strony",
          caption: "Podejście czerwonym szlakiem",
        }),
        Object.freeze({
          src: "assets/MK/Rysy Słowacja/6.webp",
          width: 9000,
          height: 9000,
          alt: "Kadr z wejścia na Rysy od słowackiej strony",
          caption: "W Dolinie Żabiej Mięguszowieckiej",
        }),
        Object.freeze({
          src: "assets/MK/Rysy Słowacja/7.webp",
          width: 9000,
          height: 9000,
          alt: "Tablica przy Schronisku pod Rysami z widokiem na Tatry",
          caption: "Przy Schronisku pod Rysami",
        }),
        Object.freeze({
          src: "assets/MK/Rysy Słowacja/8.webp",
          width: 9000,
          height: 9000,
          alt: "Kadr z wejścia na Rysy od słowackiej strony",
          caption: "Górska panorama pod Rysami",
        }),
        Object.freeze({
          src: "assets/MK/Rysy Słowacja/9.webp",
          width: 2994,
          height: 2993,
          alt: "Grupa turystów na skalistym szczycie Rysów",
          caption: "Na Rysach",
        }),
      ]),
    }),
    11: Object.freeze({
      date: "2025-09-20",
      dayOrder: 2,
      page: "entries/mateusz/swinica/index.html",
      route: Object.freeze({
        label: "Kuźnice → zielony szlak → Kasprowy Wierch → czerwony szlak przez Liliowe → Świnicka Przełęcz → czerwony szlak → Świnica",
        duration: "5:20 h",
        distanceKm: 9.7,
        ascentM: 1465,
        descentM: 199,
      }),
      photos: Object.freeze([
        Object.freeze({
          src: "assets/MK/Kasprowy Wierch/1.webp",
          width: 9000,
          height: 9000,
          alt: "Drogowskaz na zielonym szlaku w kierunku Kasprowego Wierchu",
          caption: "Drogowskaz na Myślenickich Turniach",
        }),
        Object.freeze({
          src: "assets/MK/Kasprowy Wierch/2.webp",
          width: 1535,
          height: 1536,
          alt: "Mateusz na podejściu na Kasprowy Wierch z widokiem na dolinę",
          caption: "Panorama z podejścia na Kasprowy",
        }),
        Object.freeze({
          src: "assets/MK/Kasprowy Wierch/3.webp",
          width: 3024,
          height: 3024,
          alt: "Grupa turystów na grzbiecie Kasprowego Wierchu",
          caption: "Na grzbiecie Kasprowego Wierchu",
        }),
        Object.freeze({
          src: "assets/MK/Kasprowy Wierch/4.webp",
          width: 1536,
          height: 1536,
          alt: "Grupa turystów przy drogowskazie na Kasprowym Wierchu",
          caption: "Na Kasprowym Wierchu",
        }),
        Object.freeze({
          src: "assets/MK/Świnica/1.webp",
          width: 9000,
          height: 9000,
          alt: "Grań Liliowe na czerwonym szlaku w kierunku Świnicy",
          caption: "Czerwony szlak przez Liliowe",
        }),
        Object.freeze({
          src: "assets/MK/Świnica/2.webp",
          width: 8999,
          height: 9000,
          alt: "Drogowskaz na Liliowem wskazujący drogę na Świnicę",
          caption: "Drogowskaz na Liliowem",
        }),
        Object.freeze({
          src: "assets/MK/Świnica/3.webp",
          width: 1536,
          height: 1536,
          alt: "Mateusz na skalistym szlaku z widokiem na Świnicę",
          caption: "Świnica przed nami",
        }),
        Object.freeze({
          src: "assets/MK/Świnica/4.webp",
          width: 2999,
          height: 3000,
          alt: "Skaliste podejście czerwonym szlakiem pod Świnicę",
          caption: "Podejście pod Świnicę",
        }),
        Object.freeze({
          src: "assets/MK/Świnica/5.webp",
          width: 3000,
          height: 3000,
          alt: "Turyści na ubezpieczonym łańcuchami odcinku szlaku na Świnicę",
          caption: "Ubezpieczony odcinek szlaku",
        }),
        Object.freeze({
          src: "assets/MK/Świnica/6.webp",
          width: 3024,
          height: 3023,
          alt: "Turyści na stromym skalistym podejściu na Świnicę",
          caption: "Strome podejście na szczyt",
        }),
        Object.freeze({
          src: "assets/MK/Świnica/7.webp",
          width: 9000,
          height: 8999,
          alt: "Grupa turystów na szczycie Świnicy",
          caption: "Na szczycie Świnicy",
        }),
      ]),
    }),
    25: Object.freeze({
      date: "2024-07-13",
      page: "entries/mateusz/szpiglasowy-wierch/index.html",
      route: Object.freeze({
        label: "Palenica Białczańska → czerwony szlak → most nad Roztoką → zielony szlak (Dolina Roztoki, Siklawa) → niebieski szlak (Niżnie Solnisko) → żółty szlak przez Szpiglasową Przełęcz → Szpiglasowy Wierch",
        duration: "5:25 h",
        distanceKm: 11.4,
        ascentM: 1300,
        descentM: 113,
      }),
      photos: Object.freeze([
        Object.freeze({
          src: "assets/MK/Szpiglasowy Wierch/1.webp",
          width: 9000,
          height: 9000,
          alt: "Turyści na szlaku wśród zielonych zboczy Doliny Roztoki",
          caption: "Szlak przez Dolinę Roztoki",
        }),
        Object.freeze({
          src: "assets/MK/Szpiglasowy Wierch/2.webp",
          width: 9000,
          height: 9000,
          alt: "Wodospad Siklawa spływający po skalnych ścianach",
          caption: "Wodospad Siklawa",
        }),
        Object.freeze({
          src: "assets/MK/Szpiglasowy Wierch/3.webp",
          width: 8999,
          height: 9000,
          alt: "Mateusz stojący na drewnianym mostku nad górskim potokiem",
          caption: "Mostek nad potokiem",
        }),
        Object.freeze({
          src: "assets/MK/Szpiglasowy Wierch/4.webp",
          width: 1799,
          height: 1799,
          alt: "Turyści na skalistym podejściu oznaczonym żółtym szlakiem",
          caption: "Podejście żółtym szlakiem",
        }),
        Object.freeze({
          src: "assets/MK/Szpiglasowy Wierch/5.webp",
          width: 1471,
          height: 1471,
          alt: "Mateusz przy drogowskazie Szpiglasowego Wierchu",
          caption: "Przy drogowskazie Szpiglasowego Wierchu",
        }),
        Object.freeze({
          src: "assets/MK/Szpiglasowy Wierch/6.webp",
          width: 9000,
          height: 9000,
          alt: "Mateusz siedzący na skalistym szczycie Szpiglasowego Wierchu",
          caption: "Na szczycie Szpiglasowego Wierchu",
        }),
      ]),
    }),
    48: Object.freeze({
      date: "2025-09-20",
      dayOrder: 1,
      page: "entries/mateusz/kasprowy-wierch/index.html",
      route: Object.freeze({
        label: "Kuźnice → zielony szlak → Kasprowy Wierch",
        duration: "3:13 h",
        distanceKm: 6.4,
        ascentM: 972,
        descentM: 20,
      }),
      photos: Object.freeze([
        Object.freeze({
          src: "assets/MK/Kasprowy Wierch/1.webp",
          width: 9000,
          height: 9000,
          alt: "Drogowskaz na zielonym szlaku w kierunku Kasprowego Wierchu",
          caption: "Drogowskaz na Myślenickich Turniach",
        }),
        Object.freeze({
          src: "assets/MK/Kasprowy Wierch/2.webp",
          width: 1535,
          height: 1536,
          alt: "Mateusz na podejściu na Kasprowy Wierch z widokiem na dolinę",
          caption: "Panorama z podejścia",
        }),
        Object.freeze({
          src: "assets/MK/Kasprowy Wierch/3.webp",
          width: 3024,
          height: 3024,
          alt: "Grupa turystów na grzbiecie Kasprowego Wierchu",
          caption: "Na grzbiecie Kasprowego Wierchu",
        }),
        Object.freeze({
          src: "assets/MK/Kasprowy Wierch/4.webp",
          width: 1536,
          height: 1536,
          alt: "Grupa turystów przy drogowskazie na Kasprowym Wierchu",
          caption: "Na Kasprowym Wierchu",
        }),
      ]),
    }),
    58: Object.freeze({
      date: "2026-10-09",
      dayOrder: 1,
      page: "entries/mateusz/gesia-szyja/index.html",
      route: Object.freeze({
        label: "Wierch Poroniec → zielony szlak → Rusinowa Polana → zielony szlak → Gęsia Szyja",
        duration: "1:45 h",
        distanceKm: 4.5,
        ascentM: 419,
        descentM: 34,
      }),
      photos: gesiaSzyjaPhotos,
    }),
    59: Object.freeze({
      date: "2026-10-09",
      dayOrder: 2,
      page: "entries/mateusz/wielki-kopieniec/index.html",
      route: Object.freeze({
        label: "Wierch Poroniec → zielony szlak → Rusinowa Polana → zielony szlak → Gęsia Szyja → zielony szlak → Waksmundzka Rówień → czerwony szlak → Psia Trawka → czerwony szlak → Hala Kopieniec (skrzyżowanie szlaków) → zielony szlak → Polana Kopieniec → Wielki Kopieniec",
        duration: "3:43 h",
        distanceKm: 11.7,
        ascentM: 704,
        descentM: 476,
      }),
      photos: Object.freeze([
        ...gesiaSzyjaPhotos,
        Object.freeze({
          src: "assets/MK/Wielki Kopieniec/6.webp",
          width: 3072,
          height: 3072,
          alt: "Schody na skalistym szlaku schodzącym z Gęsiej Szyi wśród jesiennej roślinności",
          caption: "Zejście z Gęsiej Szyi",
        }),
        Object.freeze({
          src: "assets/MK/Wielki Kopieniec/7.webp",
          width: 3072,
          height: 3072,
          alt: "Drogowskaz na Waksmundzkiej Równi wskazujący czerwony szlak do Psiej Trawki",
          caption: "Waksmundzka Rówień",
        }),
        Object.freeze({
          src: "assets/MK/Wielki Kopieniec/8.webp",
          width: 3072,
          height: 3072,
          alt: "Drogowskaz w jesiennym lesie wskazujący zielony szlak na Wielki Kopieniec",
          caption: "Rozdroże w kierunku Wielkiego Kopieńca",
        }),
        Object.freeze({
          src: "assets/MK/Wielki Kopieniec/9.webp",
          width: 3072,
          height: 3072,
          alt: "Drewniane szałasy na Polanie Kopieniec z lasem i tatrzańskimi szczytami w tle",
          caption: "Polana Kopieniec",
        }),
        Object.freeze({
          src: "assets/MK/Wielki Kopieniec/10.webp",
          width: 2252,
          height: 2252,
          alt: "Trzech uczestników wyprawy na szczycie z kartką z nazwą Wielki Kopieniec",
          caption: "Na szczycie Wielkiego Kopieńca",
        }),
      ]),
    }),
    60: Object.freeze({
      date: "2021-10-01",
      page: "entries/mateusz/nosal/index.html",
      route: Object.freeze({
        label: "ul. Bulwary Słowackiego → zielony szlak → Nosal",
        duration: "0:40 h",
        distanceKm: 0.9,
        ascentM: 250,
        descentM: 0,
      }),
      photos: Object.freeze([
        Object.freeze({
          src: "assets/MK/Nosal/1.webp",
          width: 1532,
          height: 1532,
          alt: "Mateusz na leśnym szlaku nad potokiem, z Tatrami w tle",
          caption: "Na leśnym odcinku szlaku",
        }),
        Object.freeze({
          src: "assets/MK/Nosal/2.webp",
          width: 1531,
          height: 1532,
          alt: "Skalisty szlak na Nosalu pośród jesiennego lasu",
          caption: "Skalisty grzbiet Nosala",
        }),
        Object.freeze({
          src: "assets/MK/Nosal/3.webp",
          width: 1532,
          height: 1531,
          alt: "Mateusz siedzący na skałach na szczycie Nosala",
          caption: "Na szczycie Nosala",
        }),
      ]),
    }),
  }),
  artur: Object.freeze({
    11: Object.freeze({
      date: "2025-09-20",
      dayOrder: 2,
      page: "entries/artur/swinica/index.html",
      route: Object.freeze({
        label: "Kuźnice → zielony szlak → Kasprowy Wierch → czerwony szlak przez Liliowe → Świnicka Przełęcz → czerwony szlak → Świnica",
        duration: "5:20 h",
        distanceKm: 9.7,
        ascentM: 1465,
        descentM: 199,
      }),
      photos: Object.freeze([
        ...arturKasprowyPhotos,
        Object.freeze({
          src: "assets/AU/Świnica/1.webp",
          width: 2048,
          height: 2048,
          alt: "Czerwony szlak granią w kierunku Świnicy, w tle taśma z oznaczeniem TPN",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Świnica/2.webp",
          width: 2048,
          height: 2048,
          alt: "Grupa turystów na skalistym podejściu pod Świnicę",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Świnica/3.webp",
          width: 2048,
          height: 2048,
          alt: "Uczestnicy wyprawy na grani pod szczytem Świnicy z panoramą Tatr Zachodnich",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Świnica/4.webp",
          width: 2048,
          height: 2048,
          alt: "Wafelek w dłoni na szczycie Świnicy, w tle turyści i Tatry Wysokie",
          caption: "",
        }),
      ]),
    }),
    48: Object.freeze({
      date: "2025-09-20",
      dayOrder: 1,
      page: "entries/artur/kasprowy-wierch/index.html",
      route: Object.freeze({
        label: "Kuźnice → zielony szlak → Kasprowy Wierch",
        duration: "3:13 h",
        distanceKm: 6.4,
        ascentM: 972,
        descentM: 20,
      }),
      photos: arturKasprowyPhotos,
    }),
    51: Object.freeze({
      date: "2026-07-28",
      page: "entries/artur/giewont/index.html",
      route: Object.freeze({
        label: "Kuźnice → Hala Kondratowa → Kondracka Przełęcz → Wyżnia Kondracka Przełęcz → Giewont",
        duration: "3:24 h",
        distanceKm: 5.9,
        ascentM: 877,
        descentM: 33,
        mapUrl: "https://mapa-turystyczna.pl/route?q=49.2694970,19.9805210;49.2510050,19.9340840",
      }),
      photos: Object.freeze([
        Object.freeze({
          src: "assets/AU/Giewont/1.webp",
          width: 1391,
          height: 1391,
          alt: "Jeleń z dużym porożem na szlaku wśród kosodrzewiny",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Giewont/2.webp",
          width: 2048,
          height: 2048,
          alt: "Kamienny szlak prowadzący trawiastym zboczem w stronę zamglonego grzbietu",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Giewont/3.webp",
          width: 2032,
          height: 2032,
          alt: "Drogowskaz na Kondrackiej Przełęczy 1725 m n.p.m. we mgle",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Giewont/4.webp",
          width: 2048,
          height: 2048,
          alt: "Turyści na skalistym podejściu, w tle krzyż na Giewoncie we mgle",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Giewont/5.webp",
          width: 1504,
          height: 1504,
          alt: "Metalowy krzyż na skalistym wierzchołku Giewontu",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Giewont/6.webp",
          width: 2048,
          height: 2048,
          alt: "Turyści na ubezpieczonym łańcuchami odcinku szlaku na Giewont",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Giewont/7.webp",
          width: 2048,
          height: 2048,
          alt: "Artur u podstawy krzyża na szczycie Giewontu",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Giewont/8.webp",
          width: 2047,
          height: 2047,
          alt: "Uśmiechnięty Artur na tle konstrukcji krzyża na Giewoncie",
          caption: "",
        }),
      ]),
    }),
    58: Object.freeze({
      date: "2026-10-09",
      dayOrder: 1,
      page: "entries/artur/gesia-szyja/index.html",
      route: Object.freeze({
        label: "Wierch Poroniec → zielony szlak → Rusinowa Polana → zielony szlak → Gęsia Szyja",
        duration: "1:45 h",
        distanceKm: 4.5,
        ascentM: 419,
        descentM: 34,
      }),
      photos: arturGesiaSzyjaPhotos,
    }),
    59: Object.freeze({
      date: "2026-10-09",
      dayOrder: 2,
      page: "entries/artur/wielki-kopieniec/index.html",
      route: Object.freeze({
        label: "Wierch Poroniec → zielony szlak → Rusinowa Polana → zielony szlak → Gęsia Szyja → zielony szlak → Waksmundzka Rówień → czerwony szlak → Psia Trawka → czerwony szlak → Hala Kopieniec (skrzyżowanie szlaków) → zielony szlak → Polana Kopieniec → Wielki Kopieniec",
        duration: "3:43 h",
        distanceKm: 11.7,
        ascentM: 704,
        descentM: 476,
      }),
      photos: Object.freeze([
        ...arturGesiaSzyjaPhotos,
        Object.freeze({
          src: "assets/AU/Wielki Kopieniec/5.webp",
          width: 2046,
          height: 2046,
          alt: "Trzech uczestników wyprawy na drewnianej kładce wśród świerkowego lasu",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Wielki Kopieniec/6.webp",
          width: 2047,
          height: 2047,
          alt: "Artur z uniesionymi kijami trekkingowymi na drewnianej kładce",
          caption: "",
        }),
        Object.freeze({
          src: "assets/AU/Wielki Kopieniec/7.webp",
          width: 1120,
          height: 1120,
          alt: "Trzech uczestników wyprawy na szczycie z kartką z nazwą Wielki Kopieniec 1328 m",
          caption: "",
        }),
      ]),
    }),
  }),
});

const FOLDER_PREVIEW_LIMIT = 12;

const countryNames = {
  PL: "Polska",
  SK: "Słowacja",
};

const personNames = {
  mateusz: "Mateusz Kosowski",
  artur: "Artur Urbaniak",
};

const normalizeText = (value) =>
  value
    .toLocaleLowerCase("pl")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l");

function createStatusMarkup(person, placeId) {
  const isCompleted = completedPlaces[person].has(placeId);
  const stateLabel = isCompleted ? "zdobyty" : "brak wpisu";
  const symbol = isCompleted ? "✓" : "—";

  return `
    <span class="status ${isCompleted ? "status--done" : "status--empty"}">
      <span class="status-mark" aria-hidden="true">${symbol}</span>
      <span class="sr-only">${personNames[person]}: ${stateLabel}</span>
    </span>
  `;
}

function createPlaceRow(place) {
  const row = document.createElement("tr");
  const typeLabel = place.type === "przelecz" ? "Przełęcz" : "Szczyt";
  const typeClass = place.type === "przelecz" ? " type-badge--pass" : "";

  row.innerHTML = `
    <td class="column-index">${place.id}</td>
    <th class="column-place" scope="row">
      ${place.name}
      <span class="place-mobile-meta">
        <span>${String(place.id).padStart(2, "0")}</span>
        <span>${typeLabel}</span>
        <span>${place.country}</span>
        <span>${place.height} m n.p.m.</span>
      </span>
    </th>
    <td class="column-type"><span class="type-badge${typeClass}">${typeLabel}</span></td>
    <td class="column-country">
      <abbr class="country-badge" title="${countryNames[place.country]}">${place.country}</abbr>
    </td>
    <td class="column-height">${place.height} <small>m n.p.m.</small></td>
    <td class="column-person">${createStatusMarkup("mateusz", place.id)}</td>
    <td class="column-person">${createStatusMarkup("artur", place.id)}</td>
  `;

  return row;
}

function updateProfileSummaries() {
  Object.keys(completedPlaces).forEach((person) => {
    const completed = places.filter((place) => completedPlaces[person].has(place.id)).length;
    const percentage = Math.round((completed / places.length) * 100);
    const stage = completed >= 60
      ? "Złota Odznaka"
      : completed >= 40
        ? "Srebrna Odznaka"
        : completed >= 20
          ? "Brązowa Odznaka"
          : "Początek drogi";
    const galleryCount = Object.values(profileEntries[person] ?? {}).filter(
      (entry) => Array.isArray(entry.photos) && entry.photos.length > 0,
    ).length;

    document.querySelectorAll(`[data-completed="${person}"]`).forEach((element) => {
      element.textContent = completed;
    });
    document.querySelectorAll(`[data-percentage="${person}"]`).forEach((element) => {
      element.textContent = `${percentage}%`;
    });
    document.querySelectorAll(`[data-progress="${person}"]`).forEach((element) => {
      element.style.width = `${percentage}%`;
    });
    document.querySelectorAll(`[data-progressbar="${person}"]`).forEach((element) => {
      element.setAttribute("aria-valuenow", String(completed));
    });
    document.querySelectorAll(`[data-to-bronze="${person}"]`).forEach((element) => {
      element.textContent = Math.max(0, 20 - completed);
    });
    document.querySelectorAll(`[data-gallery-count="${person}"]`).forEach((element) => {
      element.textContent = galleryCount;
    });
    document.querySelectorAll(`[data-stage="${person}"]`).forEach((element) => {
      element.textContent = stage;
    });
  });
}

function getPhotoCount(person, placeId) {
  const photos = profileEntries[person]?.[placeId]?.photos;
  return Array.isArray(photos) ? photos.length : 0;
}

function formatPhotoCount(count) {
  if (count === 1) return "1 zdjęcie";

  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const usesFewForm = lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14);

  return `${count} ${usesFewForm ? "zdjęcia" : "zdjęć"}`;
}

function formatEntryDate(value, style = "long") {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;

  if (style === "short") {
    return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
  }

  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function createFolderCard(place, person) {
  const entry = profileEntries[person]?.[place.id];
  const hasPage = Boolean(entry?.page);
  const card = document.createElement(hasPage ? "a" : "article");
  const isCompleted = completedPlaces[person]?.has(place.id) ?? false;
  const photoCount = getPhotoCount(person, place.id);
  const photoLabel = photoCount > 0 ? formatPhotoCount(photoCount) : "Zdjęcia wkrótce";
  const openLabel = photoCount > 0 ? "Otwórz galerię" : "Otwórz wpis";
  const typeLabel = place.type === "przelecz" ? "Przełęcz" : "Szczyt";
  const accessibleDate = entry?.date ? formatEntryDate(entry.date) : "data do uzupełnienia";
  const dateMarkup = entry?.date
    ? `<time class="folder-date" datetime="${entry.date}">Zdobyty ${formatEntryDate(entry.date, "short")}</time>`
    : "";

  card.className = `folder-card${isCompleted ? " is-completed" : " is-empty"}${hasPage ? " has-entry" : ""}${photoCount > 0 ? " has-gallery" : ""}`;
  if (hasPage) {
    card.href = entry.page;
    card.setAttribute(
      "aria-label",
      `${openLabel}: ${place.name}, ${accessibleDate}, ${photoLabel}`,
    );
  }
  card.innerHTML = `
    <div class="folder-card-topline">
      <span class="folder-index">${String(place.id).padStart(2, "0")}</span>
      <span class="folder-photo-count">${photoLabel}</span>
    </div>
    <span class="folder-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M2.5 6.5h6l2 2h11v10.5h-19z"></path>
        <path d="M2.5 9h19"></path>
      </svg>
    </span>
    <div class="folder-card-copy">
      <p>${typeLabel} <span aria-hidden="true">·</span> ${place.height} m n.p.m.</p>
      <h3>${place.name}</h3>
      ${dateMarkup}
    </div>
    <div class="folder-card-footer">
      <span class="folder-state"><i aria-hidden="true"></i>${hasPage ? openLabel : isCompleted ? "Zdobyty" : "Brak wpisu"}</span>
      <abbr title="${countryNames[place.country]}">${place.country}</abbr>
    </div>
  `;

  return card;
}

function initializeProfileFolders() {
  const grid = document.querySelector("#profile-folders");
  const searchInput = document.querySelector("#folder-search");
  const filterButtons = [...document.querySelectorAll("[data-folder-filter]")];
  const resultCount = document.querySelector("#folder-result-count");
  const toggleButton = document.querySelector("#folder-toggle");

  if (!grid || !searchInput || !resultCount || !toggleButton) return;

  const person = grid.dataset.profile;
  if (!person || !completedPlaces[person]) return;

  let activeFilter = "all";
  let showAll = false;

  function renderFolders() {
    const searchTerm = normalizeText(searchInput.value.trim());
    const hasActiveCriteria = Boolean(searchTerm) || activeFilter !== "all";
    const completedProfilePlaces = places
      .filter((place) => completedPlaces[person].has(place.id))
      .sort((firstPlace, secondPlace) => {
        const firstEntry = profileEntries[person]?.[firstPlace.id];
        const secondEntry = profileEntries[person]?.[secondPlace.id];
        const firstDate = firstEntry?.date;
        const secondDate = secondEntry?.date;

        if (firstDate && secondDate) {
          const dateOrder = firstDate.localeCompare(secondDate);
          if (dateOrder !== 0) return dateOrder;
          return (firstEntry?.dayOrder ?? 0) - (secondEntry?.dayOrder ?? 0);
        }
        if (firstDate) return -1;
        if (secondDate) return 1;
        return firstPlace.id - secondPlace.id;
      });
    const filteredPlaces = completedProfilePlaces.filter((place) => {
      const matchesType = activeFilter === "all" || place.type === activeFilter;
      const searchableText = normalizeText(
        `${place.name} ${place.height} ${place.country} ${countryNames[place.country]} ${place.type}`,
      );

      return matchesType && searchableText.includes(searchTerm);
    });
    const visiblePlaces = showAll || hasActiveCriteria
      ? filteredPlaces
      : filteredPlaces.slice(0, FOLDER_PREVIEW_LIMIT);

    if (visiblePlaces.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "folder-no-results";
      emptyMessage.textContent = "Nie znaleziono katalogu pasującego do wybranych kryteriów.";
      grid.replaceChildren(emptyMessage);
    } else {
      const fragment = document.createDocumentFragment();
      visiblePlaces.forEach((place) => fragment.append(createFolderCard(place, person)));
      grid.replaceChildren(fragment);
    }

    resultCount.textContent = `Wyświetlono ${visiblePlaces.length} z ${filteredPlaces.length} katalogów`;

    const canToggle = !hasActiveCriteria && filteredPlaces.length > FOLDER_PREVIEW_LIMIT;
    toggleButton.hidden = !canToggle;
    if (canToggle) {
      toggleButton.querySelector("span").textContent = showAll
        ? "Pokaż mniej katalogów"
        : `Pokaż wszystkie katalogi (${filteredPlaces.length})`;
      toggleButton.classList.toggle("is-expanded", showAll);
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.folderFilter;
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderFolders();
    });
  });

  searchInput.addEventListener("input", renderFolders);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchInput.value) {
      searchInput.value = "";
      renderFolders();
    }
  });

  toggleButton.addEventListener("click", () => {
    showAll = !showAll;
    renderFolders();
  });

  renderFolders();
}

function initializeEntryPage() {
  const entryPage = document.querySelector("[data-entry-person][data-entry-place]");
  if (!entryPage) return;

  const person = entryPage.dataset.entryPerson;
  const placeId = Number(entryPage.dataset.entryPlace);
  const place = places.find((item) => item.id === placeId);
  const entry = profileEntries[person]?.[placeId];

  if (!place || !entry) return;

  document.querySelectorAll("[data-entry-name]").forEach((element) => {
    element.textContent = place.name;
  });
  document.querySelectorAll("[data-entry-height]").forEach((element) => {
    element.textContent = place.height;
  });
  document.querySelectorAll("[data-entry-country]").forEach((element) => {
    element.textContent = countryNames[place.country];
  });
  document.querySelectorAll("[data-entry-date]").forEach((element) => {
    element.textContent = formatEntryDate(entry.date);
    element.setAttribute("datetime", entry.date);
  });
  document.querySelectorAll("[data-entry-photo-count]").forEach((element) => {
    element.textContent = formatPhotoCount(entry.photos.length);
  });
  document.querySelectorAll("[data-entry-gallery-description]").forEach((element) => {
    element.textContent = entry.photos.length > 0
      ? `${formatPhotoCount(entry.photos.length)}. Wybierz kadr, aby otworzyć pełnoekranowy podgląd.`
      : "Zdjęcia z tej wyprawy dodamy wkrótce.";
  });

  const gallery = document.querySelector("#entry-gallery");
  if (gallery) {
    gallery.hidden = entry.photos.length === 0;
    const fragment = document.createDocumentFragment();

    entry.photos.forEach((photo, index) => {
      const link = document.createElement("a");
      link.className = "gallery-tile is-loading";
      link.href = photo.src;
      link.dataset.galleryItem = "";
      link.dataset.caption = photo.caption;
      link.setAttribute(
        "aria-label",
        `Otwórz zdjęcie ${index + 1} z ${entry.photos.length}: ${photo.caption || photo.alt}`,
      );
      link.innerHTML = `
        <img
          src="${photo.src}"
          alt="${photo.alt}"
          width="${photo.width}"
          height="${photo.height}"
          loading="lazy"
          decoding="async"
        >
        <span class="gallery-tile-loader" aria-hidden="true"></span>
        <span class="gallery-tile-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="gallery-tile-caption">${photo.caption}</span>
        <span class="gallery-tile-open" aria-hidden="true">
          <svg viewBox="0 0 20 20"><path d="M7 3H3v4m10-4h4v4M7 17H3v-4m10 4h4v-4"></path></svg>
        </span>
      `;

      const image = link.querySelector("img");
      const revealImage = () => {
        if (!image.complete || image.naturalWidth === 0) return;

        image
          .decode()
          .catch(() => undefined)
          .finally(() => link.classList.replace("is-loading", "is-loaded"));
      };

      image.addEventListener("load", revealImage, { once: true });
      image.addEventListener(
        "error",
        () => link.classList.replace("is-loading", "has-image-error"),
        { once: true },
      );
      revealImage();
      fragment.append(link);
    });

    gallery.replaceChildren(fragment);
  }

  const route = entry.route;
  const routeCard = document.querySelector("[data-route-card]");
  const routePending = document.querySelector("[data-route-pending]");
  const routeLink = document.querySelector("[data-route-link]");
  const distanceFormatter = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 1 });

  document.querySelectorAll("[data-route-label]").forEach((element) => {
    element.textContent = route?.label ?? "Do uzupełnienia";
  });
  document.querySelectorAll("[data-route-distance]").forEach((element) => {
    const details = [];

    if (route?.duration) details.push(route.duration);
    if (Number.isFinite(route?.distanceKm)) {
      details.push(`${distanceFormatter.format(route.distanceKm)} km`);
    }

    element.textContent = details.join(" · ") || "—";
  });
  document.querySelectorAll("[data-route-ascent]").forEach((element) => {
    element.textContent = Number.isFinite(route?.ascentM) ? `${route.ascentM} m` : "—";
  });
  document.querySelectorAll("[data-route-descent]").forEach((element) => {
    element.textContent = Number.isFinite(route?.descentM) ? `${route.descentM} m` : "—";
  });

  routeCard?.classList.toggle("is-pending", !route);
  if (routePending) routePending.hidden = Boolean(route);
  if (routeLink) {
    routeLink.hidden = !route?.mapUrl;
    if (route?.mapUrl) routeLink.href = route.mapUrl;
  }
}

function initializeTable() {
  const tableBody = document.querySelector("#summits-table-body");
  const searchInput = document.querySelector("#place-search");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const resultCount = document.querySelector("#result-count");

  if (!tableBody || !searchInput || !resultCount) return;

  let activeFilter = "all";

  function renderTable() {
    const searchTerm = normalizeText(searchInput.value.trim());
    const filteredPlaces = places
      .filter((place) => {
        const matchesType = activeFilter === "all" || place.type === activeFilter;
        const searchableText = normalizeText(
          `${place.name} ${place.height} ${place.country} ${countryNames[place.country]} ${place.type}`,
        );

        return matchesType && searchableText.includes(searchTerm);
      })
      .sort((firstPlace, secondPlace) => secondPlace.height - firstPlace.height || firstPlace.id - secondPlace.id);

    const fragment = document.createDocumentFragment();
    filteredPlaces.forEach((place) => fragment.append(createPlaceRow(place)));

    tableBody.replaceChildren(fragment);

    if (filteredPlaces.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.className = "no-results";
      const emptyCell = document.createElement("td");
      emptyCell.colSpan = 7;
      const title = document.createElement("strong");
      title.textContent = "Nie znaleziono takiego miejsca";
      const hint = document.createElement("span");
      hint.textContent = "Zmień wpisaną nazwę lub wybierz inny filtr.";
      emptyCell.append(title, hint);
      emptyRow.append(emptyCell);
      tableBody.append(emptyRow);
    }

    resultCount.textContent = `Wyświetlono ${filteredPlaces.length} z ${places.length} miejsc`;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderTable();
    });
  });

  searchInput.addEventListener("input", renderTable);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchInput.value) {
      searchInput.value = "";
      renderTable();
    }
  });

  renderTable();
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

initializePagePosition();
initializeInternalNavigation();
updateProfileSummaries();
initializeProfileFolders();
initializeEntryPage();
initializeTable();

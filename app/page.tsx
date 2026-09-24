"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  CalendarDays,
  Check,
  ChevronDown,
  Globe2,
  Heart,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

const homes = [
  {
    city: "Astana",
    title: "Room near Nazarbayev University",
    type: "Private room · 8 min to campus",
    price: "₸185,000",
    image: "linear-gradient(135deg, #d7ad8e, #f3dfc7 56%, #a8b7a0)",
    tag: "Verified",
  },
  {
    city: "Almaty",
    title: "Shared apartment near KBTU",
    type: "Shared apartment · 10 min to campus",
    price: "₸145,000",
    image: "linear-gradient(135deg, #aac5c4, #e8d5b7 58%, #c6876d)",
    tag: "Popular",
  },
  {
    city: "Almaty",
    title: "Student apartment in Bostandyk",
    type: "Studio apartment · Near KazNU",
    price: "₸230,000",
    image: "linear-gradient(135deg, #e8c2a1, #f8edcf 58%, #789d97)",
    tag: "Verified",
  },
];

const people = [
  {
    name: "Aigerim, 20",
    school: "Nazarbayev University",
    city: "Astana",
    match: "96%",
    initials: "A",
    color: "#f2b39d",
    tags: ["Tidy", "Early riser"],
  },
  {
    name: "Daniyar, 22",
    school: "al-Farabi KazNU",
    city: "Almaty",
    match: "91%",
    initials: "D",
    color: "#afd5cb",
    tags: ["Social", "Likes guests"],
  },
  {
    name: "Sofia, 21",
    school: "Exchange student",
    city: "Astana",
    match: "88%",
    initials: "S",
    color: "#e9c7a2",
    tags: ["Quiet", "No smoking"],
  },
  {
    name: "Minho, 23",
    school: "International student",
    city: "Almaty",
    match: "90%",
    initials: "M",
    color: "#c9b8dc",
    tags: ["Night owl", "No smoking"],
  },
];

const events = [
  {
    date: "12",
    month: "OCT",
    title: "International student meetup",
    place: "Astana Hub, Astana",
    color: "#dff4eb",
  },
  {
    date: "16",
    month: "OCT",
    title: "Language exchange night",
    place: "Esentai, Almaty",
    color: "#fff0ec",
  },
  {
    date: "22",
    month: "OCT",
    title: "Weekend trip to Burabay",
    place: "Saryarka Station, Astana",
    color: "#fff6d9",
  },
];

function Logo() {
  return (
    <a
      href="#top"
      className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight"
      aria-label="Nomad Student home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--coral)] text-white">
        <Globe2 size={20} strokeWidth={2.4} />
      </span>
      nomad<span className="text-[var(--coral)]">student</span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[var(--coral)]">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-.035em] text-[var(--ink)] sm:text-[42px]">
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-base leading-7 text-[var(--muted)]">{text}</p>
      )}
    </div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const toggleSaved = (id: string) =>
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  return (
    <main id="top" className="overflow-hidden">
      <nav
        className="container relative flex h-[76px] items-center justify-between"
        aria-label="Main navigation"
      >
        <Logo />
        <div className="hidden items-center gap-7 text-sm font-semibold text-[#50636b] lg:flex">
          <a
            className="transition-colors hover:text-[var(--ink)]"
            href="#homes"
          >
            Housing
          </a>
          <a
            className="transition-colors hover:text-[var(--ink)]"
            href="#roommates"
          >
            Roommates
          </a>
          <a
            className="transition-colors hover:text-[var(--ink)]"
            href="#community"
          >
            Community
          </a>
          <a
            className="transition-colors hover:text-[var(--ink)]"
            href="#events"
          >
            Events
          </a>
          <a
            className="transition-colors hover:text-[var(--ink)]"
            href="#guide"
          >
            City Guide
          </a>
        </div>
        <div className="hidden items-center gap-5 lg:flex">
          <button
            className="flex items-center gap-1 text-sm font-bold text-[var(--muted)]"
            aria-label="Language: English"
          >
            EN <ChevronDown size={14} />
          </button>
          <a
            className="text-sm font-bold text-[var(--ink)] hover:text-[var(--coral)]"
            href="#"
          >
            Log in
          </a>
          <a
            className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            href="#start"
          >
            Get started <ArrowRight className="ml-1 inline" size={15} />
          </a>
        </div>
        <button
          className="rounded-lg p-2 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <div className="absolute left-0 right-0 top-[68px] z-20 mx-3 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-xl lg:hidden">
            <div className="grid gap-4 text-sm font-bold">
              <a href="#homes" onClick={() => setMenuOpen(false)}>
                Housing
              </a>
              <a href="#roommates" onClick={() => setMenuOpen(false)}>
                Roommates
              </a>
              <a href="#community" onClick={() => setMenuOpen(false)}>
                Community
              </a>
              <a href="#events" onClick={() => setMenuOpen(false)}>
                Events
              </a>
              <a href="#guide" onClick={() => setMenuOpen(false)}>
                City Guide
              </a>
              <a
                className="border-t border-[var(--line)] pt-4 text-[var(--coral)]"
                href="#start"
              >
                Get started <ArrowRight className="ml-1 inline" size={15} />
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="container relative grid items-center gap-10 pb-20 pt-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16 lg:pb-28 lg:pt-20">
        <div className="relative z-10 animate-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--mint)] px-3.5 py-2 text-xs font-bold text-[var(--teal)]">
            <Sparkles size={14} /> Made for your next chapter
          </div>
          <h1 className="font-display text-[45px] font-extrabold leading-[1.06] tracking-[-.055em] sm:text-[62px]">
            Your new city,
            <br />
            <span className="text-[var(--coral)]">made familiar.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-[var(--muted)]">
            Find a home. Find your people. Feel at home. Whether you’re moving
            across Kazakhstan or arriving from abroad, start your next chapter
            with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#homes"
              className="rounded-full bg-[var(--coral)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(255,115,92,.22)] transition hover:-translate-y-0.5"
            >
              Explore your city <ArrowRight className="ml-2 inline" size={16} />
            </a>
            <a
              href="#how"
              className="rounded-full border border-[var(--line)] bg-white px-6 py-3.5 text-sm font-bold text-[var(--ink)] transition hover:border-[var(--ink)]"
            >
              How it works
            </a>
          </div>
          <div className="mt-9 flex items-center gap-3">
            <div className="flex -space-x-2">
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--cream)] bg-[#e4b8a5] text-xs font-bold">
                A
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--cream)] bg-[#b4d6ca] text-xs font-bold">
                J
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--cream)] bg-[#e9c897] text-xs font-bold">
                M
              </span>
            </div>
            <p className="text-xs font-semibold text-[var(--muted)]">
              <span className="text-[var(--ink)]">12,000+</span> students
              already finding their place
            </p>
          </div>
        </div>
        <div className="relative animate-in delay-1">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#fff0ec] blur-3xl" />
          <div className="hero-grid relative mx-auto max-w-[560px] rounded-[30px] border border-[#e1e9e7] bg-[#edf5f1] p-4 shadow-[0_25px_70px_rgba(35,73,70,.12)] sm:p-7">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--coral)] text-white">
                    <Globe2 size={15} />
                  </span>
                  <span className="font-display text-sm font-extrabold">
                    nomad<span className="text-[var(--coral)]">student</span>
                  </span>
                </div>
                <div className="h-7 w-7 rounded-full bg-[#e9c7a2]" />
              </div>
              <div className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--coral)]">
                      Your new start
                    </p>
                    <p className="font-display text-xl font-extrabold">
                      Find your place
                    </p>
                  </div>
                  <div className="rounded-lg bg-[var(--coral-soft)] p-2 text-[var(--coral)]">
                    <Search size={17} />
                  </div>
                </div>
                <div className="mb-5 flex gap-2 rounded-xl bg-[#f7f9f8] p-2">
                  <MapPin className="ml-2 mt-1 text-[var(--coral)]" size={16} />
                  <span className="text-sm text-[var(--muted)]">
                    Astana or Almaty?
                  </span>
                  <span className="ml-auto rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-[var(--teal)]">
                    Search
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-32 rounded-xl bg-[linear-gradient(135deg,#d9b08e,#efdac1_55%,#9ab6a9)] p-3">
                    <span className="rounded-md bg-white/85 px-2 py-1 text-[9px] font-bold">
                      Astana
                    </span>
                  </div>
                  <div className="h-32 rounded-xl bg-[linear-gradient(135deg,#a9c3c2,#e4d2b5_55%,#ca8871)] p-3">
                    <span className="rounded-md bg-white/85 px-2 py-1 text-[9px] font-bold">
                      Almaty
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-white bg-white p-3 shadow-[0_15px_35px_rgba(35,73,70,.14)] sm:-left-10">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--mint)] text-[var(--teal)]">
                <Users size={20} />
              </div>
              <div>
                <p className="text-[10px] text-[var(--muted)]">
                  Your roommate match
                </p>
                <p className="text-sm font-extrabold">
                  Maya · <span className="text-[var(--teal)]">96% match</span>
                </p>
              </div>
              <BadgeCheck className="text-[var(--teal)]" size={18} />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-14 left-1/2 hidden h-24 w-24 rounded-full border border-[#d7e5e0] bg-[#f5faf7] lg:block" />
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="container grid gap-5 py-5 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[var(--teal)]" size={20} />
            <span className="text-sm font-bold">
              Verified listings & profiles
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="text-[var(--coral)]" size={20} />
            <span className="text-sm font-bold">Built for student life</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle className="text-[#d79a30]" size={20} />
            <span className="text-sm font-bold">A community that gets it</span>
          </div>
        </div>
      </section>

      <section id="homes" className="container py-24">
        <SectionHeading
          eyebrow="Find your base"
          title="A place that feels like yours."
          text="Browse welcoming spaces in the cities students love. From a room in a shared flat to your own little corner of the world."
        />
        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-[var(--line)] bg-white p-2 shadow-sm sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-2">
            <Search size={19} className="text-[var(--coral)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by city or university"
              list="city-suggestions"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#91a0a2]"
            />
            <datalist id="city-suggestions">
              <option value="Astana" />
              <option value="Almaty" />
              <option value="Shymkent" />
              <option value="Karaganda" />
            </datalist>
          </div>
          <button className="rounded-xl bg-[var(--ink)] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#274b5a]">
            Search homes
          </button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {homes.map((home) => (
            <article key={home.title} className="group">
              <div
                className="relative h-64 overflow-hidden rounded-2xl"
                style={{ background: home.image }}
              >
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[var(--ink)]">
                  {home.tag}
                </span>
                <button
                  onClick={() => toggleSaved(home.title)}
                  aria-label={`Save ${home.title}`}
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[var(--coral)] transition hover:scale-105"
                >
                  {" "}
                  <Heart
                    size={17}
                    fill={saved.includes(home.title) ? "currentColor" : "none"}
                  />
                </button>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
              </div>
              <div className="pt-4">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[var(--coral)]">
                      {home.city}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-extrabold">
                      {home.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {home.type} ·{" "}
                      <Star
                        className="mb-0.5 inline text-[#e5a631]"
                        size={13}
                        fill="currentColor"
                      />{" "}
                      4.9
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-bold">
                    {home.price}
                    <span className="font-normal text-[var(--muted)]">
                      {" "}
                      / mo
                    </span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="roommates" className="bg-[#eaf5f0] py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Find your people"
              title="The right roommate changes everything."
              text="Tell us how you live, and we’ll introduce you to people who fit your rhythm. Less awkward guessing. More good mornings."
            />
            <a
              href="#start"
              className="mt-7 inline-flex items-center rounded-full bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              Take the lifestyle quiz <ArrowRight className="ml-2" size={16} />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {people.map((person) => (
              <div
                key={person.name}
                className="rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgba(39,93,79,.08)]"
              >
                <div className="relative mb-4 flex items-start justify-between">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-full text-xl font-extrabold"
                    style={{ background: person.color }}
                  >
                    {person.initials}
                  </div>
                  <span className="rounded-full bg-[var(--mint)] px-2 py-1 text-[10px] font-extrabold text-[var(--teal)]">
                    {person.match}
                  </span>
                </div>
                <p className="font-display text-sm font-extrabold">
                  {person.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  {person.school}
                  <br />
                  {person.city}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {person.tags.map((tag) => (
                    <span
                      className="rounded-md bg-[#f6f8f7] px-2 py-1 text-[10px] font-semibold text-[var(--muted)]"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="mt-4 w-full rounded-lg border border-[var(--line)] py-2 text-xs font-bold transition hover:border-[var(--teal)] hover:text-[var(--teal)]">
                  View profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="community"
        className="container grid gap-14 py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center"
      >
        <div className="order-2 lg:order-1">
          <div className="phone-grid relative mx-auto max-w-[450px] rounded-[30px] bg-[#f0f7f3] p-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-display text-lg font-extrabold">
                  Around you
                </p>
                <span className="rounded-full bg-[var(--coral-soft)] px-3 py-1 text-[10px] font-bold text-[var(--coral)]">
                  Astana
                </span>
              </div>
              <div className="space-y-3">
                {[
                  ["Aruzhan", "NU · Robotics · EN / KZ", "A", "#b8d9ca"],
                  ["Timur", "KBTU · Photography · RU / KZ", "T", "#e8c7a5"],
                  ["Elena", "Exchange · Film · EN / RU", "E", "#f2b5a7"],
                ].map(([name, info, initial, color]) => (
                  <div
                    className="flex items-center gap-3 rounded-xl border border-[var(--line)] p-3"
                    key={name}
                  >
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full text-sm font-extrabold"
                      style={{ background: color }}
                    >
                      {initial}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{name}</p>
                      <p className="text-xs text-[var(--muted)]">{info}</p>
                    </div>
                    <button className="grid h-8 w-8 place-items-center rounded-full bg-[var(--ink)] text-white">
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2 border-t border-[var(--line)] pt-5 text-xs font-bold text-[var(--teal)]">
                <Users size={15} /> 184 students nearby in Astana
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Your people, nearby"
            title="A city is better with familiar faces."
            text="Join a community of curious, open-minded students. Share a coffee, swap a tip, or find your next adventure."
          />
          <div className="mt-8 grid max-w-md grid-cols-2 gap-4 border-t border-[var(--line)] pt-6">
            <div>
              <p className="font-display text-2xl font-extrabold">30+</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                cities to explore
              </p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold">80+</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                languages spoken
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="bg-[#fffaf2] py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Make plans"
              title="Your calendar, with a little more life."
              text="From first-week mixers to weekend trips, find something that makes your new city feel yours."
            />
            <a
              className="flex shrink-0 items-center text-sm font-bold text-[var(--coral)]"
              href="#start"
            >
              See all events <ArrowRight className="ml-2" size={16} />
            </a>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.title}
                className="flex gap-4 rounded-2xl border border-[#f0e6d7] bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-xl"
                  style={{ background: event.color }}
                >
                  <div className="text-center">
                    <p className="font-display text-xl font-extrabold leading-none">
                      {event.date}
                    </p>
                    <p className="mt-1 text-[9px] font-bold tracking-widest">
                      {event.month}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--coral)]">
                    <CalendarDays size={12} /> Student event
                  </div>
                  <h3 className="font-display text-base font-extrabold">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {event.place}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Simple by design"
            title="A softer landing starts here."
          />
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            [
              "01",
              "Tell us your story",
              "Set your city, your vibe, and what makes a place feel like home.",
            ],
            [
              "02",
              "Explore your matches",
              "Discover homes, roommates, events, and local tips made for you.",
            ],
            [
              "03",
              "Start your next chapter",
              "Connect with your people and settle in with confidence.",
            ],
          ].map(([number, title, text]) => (
            <div
              key={number}
              className="relative border-t-2 border-[var(--coral)] pt-5"
            >
              <p className="font-display text-sm font-extrabold text-[var(--coral)]">
                {number}
              </p>
              <h3 className="mt-5 font-display text-xl font-extrabold">
                {title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--muted)]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="guide"
        className="border-y border-[var(--line)] bg-white py-16"
      >
        <div className="container grid gap-8 md:grid-cols-[1fr_1.5fr] md:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[var(--coral)]">
              Local knowledge
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-[-.03em]">
              The city guide you wish you had.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm font-semibold text-[var(--muted)] sm:grid-cols-4">
            <span>
              <MapPin className="mr-2 inline text-[var(--teal)]" size={16} />
              Public transport
            </span>
            <span>
              <BedDouble className="mr-2 inline text-[var(--teal)]" size={16} />
              SIM cards
            </span>
            <span>
              <ShieldCheck
                className="mr-2 inline text-[var(--teal)]"
                size={16}
              />
              Banking & payments
            </span>
            <span>
              <Sparkles className="mr-2 inline text-[var(--teal)]" size={16} />
              Student discounts
            </span>
            <span>
              <ShieldCheck
                className="mr-2 inline text-[var(--teal)]"
                size={16}
              />
              Healthcare & safety
            </span>
            <span>
              <MapPin className="mr-2 inline text-[var(--teal)]" size={16} />
              Documents & registration
            </span>
            <span>
              <Sparkles className="mr-2 inline text-[var(--teal)]" size={16} />
              Universities
            </span>
            <span>
              <BedDouble
                className="mr-2 inline text-[var(--teal)]"
                size={16}
              />
              Cafes & study places
            </span>
          </div>
        </div>
      </section>

      <section id="start" className="container py-24">
        <div className="relative overflow-hidden rounded-[28px] bg-[var(--ink)] px-7 py-14 text-center text-white sm:px-14">
          <div className="absolute -right-10 -top-24 h-60 w-60 rounded-full border-[30px] border-[#2b5360]" />
          <div className="absolute -bottom-28 -left-12 h-60 w-60 rounded-full border-[30px] border-[#204653]" />
          <div className="relative">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-[#8ed0bd]">
              Your next chapter is waiting
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-[-.04em] sm:text-[45px]">
              Find a home. Find your people. Feel at home.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#b8cacc]">
              Make the move to your new city feel a little more like coming
              home.
            </p>
            <a
              href="#homes"
              className="mt-8 inline-flex rounded-full bg-[var(--coral)] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              Get started for free <ArrowRight className="ml-2" size={16} />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-white">
        <div className="container grid gap-10 py-12 sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--muted)]">
              Helping students feel at home, wherever their next chapter takes
              them.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider">
              Explore
            </p>
            <div className="grid gap-3 text-sm text-[var(--muted)]">
              <a href="#homes">Housing</a>
              <a href="#roommates">Roommates</a>
              <a href="#events">Events</a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider">
              Company
            </p>
            <div className="grid gap-3 text-sm text-[var(--muted)]">
              <a href="#">About us</a>
              <a href="#">Safety</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider">
              Follow along
            </p>
            <div className="grid gap-3 text-sm text-[var(--muted)]">
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="container flex flex-col justify-between gap-3 border-t border-[var(--line)] py-5 text-xs text-[var(--muted)] sm:flex-row">
          <span>© 2025 Nomad Student</span>
          <span>Made for the in-between places.</span>
        </div>
      </footer>
    </main>
  );
}

/* =====================================================================
   SOUL PAGE DATA: this is the only file you need to edit.

   TO ADD A TITLE: copy one block from the "items" list, paste it at the
   TOP of the list (newest first), and change the values. Save, upload
   to GitHub, done.

   FIELDS
     type    "song", "movie" or "anime"  (must match a key in "types" below)
     title   the name of the song / movie / anime
     by      artist, director or studio (optional)
     year    release year (optional)
     rating  your rating from 0 to 10, decimals allowed, e.g. 8.5
     note    your thoughts, one or two sentences (optional)
     link    a web address to listen / watch / read more (optional)
     cover   path to an image, e.g. "images/soul/title.jpg" (optional)
     added   the date you added it, "YYYY-MM-DD" (optional, used for "newest")

   TO ADD A NEW CATEGORY (e.g. books): add a line to "types", then use
   that key as the "type" of your items. A button appears by itself.

   The entries below are EXAMPLES. Delete them and add your own.
   
  items: [
    { type: 'anime', title: 'Example anime (replace me)', by: 'Example Studio', year: 2019, rating: 9.5,
      note: 'Write what you felt about it here. One or two sentences is plenty.',
      link: '', cover: '', added: '2026-11-03' },

    { type: 'movie', title: 'Example movie (replace me)', by: 'Example Director', year: 2016, rating: 8,
      note: 'Rating, note, link and cover are all optional.',
      link: '', cover: '', added: '2026-11-02' },

    { type: 'song', title: 'Example song (replace me)', by: 'Example Artist', year: 2021, rating: 9,
      note: 'Add a link to SoundCloud, YouTube or Spotify and the title becomes clickable.',
      link: 'https://soundcloud.com/hecktyc', cover: '', added: '2026-11-01' },

    { type: 'anime', title: 'Another example anime', by: 'Example Studio', year: 2008, rating: 7.5,
      note: '', link: '', cover: '', added: '2026-10-20' },

    { type: 'movie', title: 'Another example movie', by: 'Example Director', year: 1999, rating: 10,
      note: 'A 10 gets a little extra glow.', link: '', cover: '', added: '2026-10-15' },

    { type: 'song', title: 'Another example song', by: 'Example Artist', year: 2014, rating: 6.5,
      note: '', link: '', cover: '', added: '2026-10-01' }
   
   ===================================================================== */

window.SOUL = {

  types: {
    song:  { label: 'songs' },
    movie: { label: 'movies' },
    anime: { label: 'anime' }
    // book: { label: 'books' },
  },

  items: [

   { type: 'song', title: 'Better', by: 'What So Not', rating: 8.8,
      note: '', link: 'https://tidal.com/track/77926178/u', cover: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdance-charts.b-cdn.net%2Fimages%2FSeptember_2017%2FWhat-So-Not--LPX---Better.jpg&f=1&nofb=1&ipt=94d6d5e5c963223bcb6ae6749368101f92ef2f69e5998045ec08eb3f366d0ab2&ipo=images'}

   { type: 'song', title: 'Another example song', by: 'Example Artist', rating: 6.5,
      note: '', link: '', cover: '' }

   { type: 'song', title: 'Another example song', by: 'Example Artist', rating: 6.5,
      note: '', link: '', cover: '' }

   { type: 'song', title: 'Another example song', by: 'Example Artist', rating: 6.5,
      note: '', link: '', cover: '' }

  ]
};

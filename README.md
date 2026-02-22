# Tuna-Lyrics-OBS-Overlay
An unofficial OBS browser overlay which gets music lyrics from LRClib for a OBS plugin named Tuna.

The official overlay that is in the Tuna plugin github repository looks bad, and uses a lyrics database which is hosted by the creator of the Tuna plugin.
The reason i decided to make this overlay is that:
1. The original one looks bad, just a plain text.
2. The database is not the best, so most of the songs i was stuck with no lyrics found screen.

This project was made for my personal use, but i decided that it would be good if i published it so people can use it.
This overlay uses official LRClib api.
There is also a fallback, so when GET fails it fallbacks to Search. Meaning that you will get your lyrics most of the time.

# How to use.
1. Make sure you have Tuna setuped in OBS and running on port 1608.
2. And then simply add a browser source and set the url to:
# https://jakpat2.github.io/Tuna-Lyrics-OBS-Overlay/

Ok, thats all. Enjoy!

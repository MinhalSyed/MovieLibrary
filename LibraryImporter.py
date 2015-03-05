'''You need python3 installed on your computer to run this program.'''

import re
from os import listdir, walk
from os.path import isfile, join
from tkinter.filedialog import askdirectory, asksaveasfilename

#path = "./Movies/"
path = askdirectory(title="Please select a movie directory")
outputpath = asksaveasfilename(defaultextension='.txt', title ="Please select where you want to save your file")

onlyfiles = []
for (dirpath, dirnames, filenames) in walk(path):
	for fname in filenames:
		if (bool(re.match("(.*)(mkv|iso|mp4|m2ts|avi)$", fname, re.I))):
			onlyfiles.append(fname)

#onlyfiles = [ f for f in listdir(path) if (isfile(join(path,f)) and (bool(re.match("(.*)(mkv|iso|mp4|m2ts|avi)$", f, re.I))))]
#print(onlyfiles)
#oneLine = '\n'.join(onlyfiles) + '\n';

# sampleList = ["The.Newsroom.2012.S02E06.720p.HDTV.x264-KILLERS.mkv",
    # "SonOFBatman.2014.iso",
    # "Breaking.Bad.S05E10.Buried.HDTV.XviD-AFG.avi",
    # "Breaking.Bad.S05E10.Buried.720p.HDTV.x264-AFG.mkv", #Incorrectly nonHD
    # "Dexter.S08E08.HDTV.XviD-AFG.avi",
    # "Dexter.S08E07.1080p.HDTV.x264-QCF.mkv",
    # "Dexter S08E07 720p HDTV x264-QCF.mkv",
    # "The.Great.Gatsby.2013.BluRay.1080p.DTS.x264-CHD.mkv", #Incorrectly nonHD
    # "The Forbidden Girl 2013 BRRIP Xvid AC3-BHRG.avi",
    # "Pain.&.Gain.2013.720p.BluRay.DD5.1.x264-HiDt.mkv",
    # "Band.of.Brothers.S01E02.Day.of.Days.DVDRip.XviD-AC3-BAGS.avi",
    # "Dexter.S08E06.PROPER.720p.HDTV.x264-IMMERSE.mkv", #Incorrectly nonHD
    # "Dexter S08E06 PROPER 720p HDTV x264-IMMERSE.mkv", #Incorrectly nonHD
	# "10.Things.I.Hate.About.You.1999.720p.BluRay.x264-SiNNERS.mkv",
	# "101.Dalmatians.1961.1080p.BluRay.X264-AMIABLE.mkv",
	# "101.Dalmatians.1961.1080p.BluRay.X264-AMIABLE.sub",
	# "12.Years.A.Slave.2013.Bluray.1080p.DTS-HD.x264-Grym@BTNET.mkv",
	# "2.Guns.2013.1080p.BluRay.DTS.x264-HDMaNiAcS.mkv",
	# "28 Days Later... 2002 1080p DTS multisub HighCode.mkv",
	# "28 Days Later... 2002 1080p DTS multisub HighCode.mp4",
	# "28 Weeks Later 2007 BDRip 1080p DTS multisub HighCode.mkv"]

class Movies():
    l = []
    def __init__(self):
        pass
    def addMovie(self, title,year,quality, extension):
        newm = MovieClass(title,year,quality, extension)
        self.l.append(newm)

    def to_JSON(self):
        output = "[";
        for movie in self.l:
            movStr = movie.to_JSON() + '\n'
            output += movStr + ","
        output = output[:-1]
        output += "]";
        return output


class MovieClass():
    title = ""
    year = ""
    quality = ""
    extension =""
    
    def __init__(self, title,year,quality, extension):
        self.title = title.title().strip();
        self.year = year.strip();
        self.quality = quality.strip();
        self.extension = extension.strip().lower();

    def to_JSON(self): 
        str = "\"title\": \"{0.title}\", \"year\": \"{0.year}\", \"quality\": \"{0.quality}\", \"extension\": \"{0.extension}\"".format(self)
        return "{" + str + "}"

#a_file = open('rand2.txt','w')
myMovies = Movies()

for name in onlyfiles:
    movie = re.findall(r"""(.*?[ .])  # Title
						(\d{4}) # Year
                        [ .a-zA-Z]*     # Space, period, or words
                       (\d{3,4}p)?      # Quality
					   (.*)     # Space, period, or words
					   (\.\w{3,4})		#Extension
                    """, name, re.VERBOSE)
    if len(movie) > 0:
        #a_file.write("Title: "+movie[0][0].replace(".", " ") + "\n")
        #a_file.write("Year: "+movie[0][1].replace(".", " ") + "\n")
        #a_file.write("Quality: "+(movie[0][2]+'\n' if len(movie[0][1])>0 else
        #"Unknown\n"))
        myMovies.addMovie(movie[0][0].replace(".", " "), movie[0][1].replace(".", " "), (movie[0][2]), movie[0][4])
    else:
        movie = re.findall(r"""(.*)  # Title
					   (\.\w{3,4})		#Extension
                    """, name, re.VERBOSE)
        myMovies.addMovie(movie[0][0].replace(".", " "), "", "", movie[0][1])
        #a_file.write("error")

		
with open(outputpath, 'w') as outfile:
    outfile.write(myMovies.to_JSON())
    #outfile.write(oneLine)
    #print(myMovies.to_JSON())

#a_file.close()

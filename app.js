var social = require('./legislators-social-media.json')
var legislators = require('./legislators-current.json')
var itemZeroBioguide = social[0].id.bioguide

var results = social.find(item => item.id.bioguide === itemZeroBioguide)


/// takes in a twitter name and makes it a link.

var linkifyTwitter = function (handle) {
  const suffix = ',%20I%20support%20the%20*existing*%20%23NetNeutrality%20rules.%20Please,%20tell%20the%20FCC%20to%20delay%20Thursday\'s%20vote!'
  const prefix = 'https://twitter.com/home?status=.@'
  return '[@' + handle + '](' + prefix + handle + suffix + ')'
}


// takes in a legislator, spits out their twitter ID or '' if none
// takes full social list as a constant

var isRepublican = function (legislator) {
  return (legislator.terms[0].party == 'Republican')
}

// takes in a legislator, gets their twitter

var twitter = function (legislator) {
  return social.find(item => item.id.bioguide === legislator.id.bioguide).social.twitter
}


// takes in a legislator, gets their name. 

var fullName = function (legislator) {
  return legislator.name.official_full
}


// takes in a legislator, spits out a line in my reddit post

var render = function(legislator) {
  if (isRepublican(legislator)) { 
    return (fullName(legislator) + ' - ' + linkifyTwitter(twitter(legislator)))
  }
}

// gets a list of republicans 

var republicans = legislators.filter(isRepublican)

// why doesn't this work? console.log(legislators.map(twitter))


for (i = 0; i < republicans.length; i++) {
  console.log(render(republicans[i]))
}

// var twitterList = legislators.map(l => twitter(l))

// console.log(legislators.map(legislator => render(legislator)))
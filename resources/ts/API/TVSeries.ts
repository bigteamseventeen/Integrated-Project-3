import {TMDB_API_KEY} from "../Lib/Settings";
import * as $ from 'jquery';
/// <reference path="Modules/TVSeries.ts" />
import * as SeriesList from "SeriesList";
import * as TVID from "TVID";
import * as TVID_Season from "TVID_Season";

function getAPIEndpoint(type, param) {
	return `https://api.themoviedb.org/3/${type}api_key=${TMDB_API_KEY}${param}&language=en-US`;
}

/* /tv/{tv_id}>


 */

/* tv/popular?		- Example

{
  "page": 1,
  "results": [
    {
      "poster_path": "/vC324sdfcS313vh9QXwijLIHPJp.jpg",
      "popularity": 47.432451,
      "id": 31917,
      "backdrop_path": "/rQGBjWNveVeF8f2PGRtS85w9o9r.jpg",
      "vote_average": 5.04,
      "overview": "Based on the Pretty Little Liars series of young adult novels by Sara Shepard, the series follows the lives of four girls — Spencer, Hanna, Aria, and Emily — whose clique falls apart after the disappearance of their queen bee, Alison. One year later, they begin receiving messages from someone using the name \"A\" who threatens to expose their secrets — including long-hidden ones they thought only Alison knew.",
      "first_air_date": "2010-06-08",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18,
        9648
      ],
      "original_language": "en",
      "vote_count": 133,
      "name": "Pretty Little Liars",
      "original_name": "Pretty Little Liars"
    },
    {
      "poster_path": "/esN3gWb1P091xExLddD2nh4zmi3.jpg",
      "popularity": 37.882356,
      "id": 62560,
      "backdrop_path": "/v8Y9yurHuI7MujWQMd8iL3Gy4B5.jpg",
      "vote_average": 7.5,
      "overview": "A contemporary and culturally resonant drama about a young programmer, Elliot, who suffers from a debilitating anti-social disorder and decides that he can only connect to people by hacking them. He wields his skills as a weapon to protect the people that he cares about. Elliot will find himself in the intersection between a cybersecurity firm he works for and the underworld organizations that are recruiting him to bring down corporate America.",
      "first_air_date": "2015-05-27",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        80,
        18
      ],
      "original_language": "en",
      "vote_count": 287,
      "name": "Mr. Robot",
      "original_name": "Mr. Robot"
    },
    {
      "poster_path": "/i6Iu6pTzfL6iRWhXuYkNs8cPdJF.jpg",
      "popularity": 34.376914,
      "id": 37680,
      "backdrop_path": "/8SAQqivlp74MZ7u55ccR1xa0Nby.jpg",
      "vote_average": 6.94,
      "overview": "While running from a drug deal gone bad, Mike Ross, a brilliant young college-dropout, slips into a job interview with one of New York City's best legal closers, Harvey Specter. Tired of cookie-cutter law school grads, Harvey takes a gamble by hiring Mike on the spot after he recognizes his raw talent and photographic memory. Mike and Harvey are a winning team. Even though Mike is a genius, he still has a lot to learn about law. And while Harvey may seem like an emotionless, cold-blooded shark, Mike's sympathy and concern for their cases and clients will help remind Harvey why he went into law in the first place. Mike's other allies in the office include the firm's best paralegal Rachel and Harvey's no-nonsense assistant Donna to help him serve justice. Proving to be an irrepressible duo and invaluable to the practice, Mike and Harvey must keep their secret from everyone including managing partner Jessica and Harvey's arch nemesis Louis, who seems intent on making Mike's life as difficult as possible.",
      "first_air_date": "2011-06-23",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18
      ],
      "original_language": "en",
      "vote_count": 161,
      "name": "Suits",
      "original_name": "Suits"
    },
    {
      "poster_path": "/jIhL6mlT7AblhbHJgEoiBIOUVl1.jpg",
      "popularity": 29.780826,
      "id": 1399,
      "backdrop_path": "/mUkuc2wyV9dHLG0D0Loaw5pO2s8.jpg",
      "vote_average": 7.91,
      "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
      "first_air_date": "2011-04-17",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        10765,
        10759,
        18
      ],
      "original_language": "en",
      "vote_count": 1172,
      "name": "Game of Thrones",
      "original_name": "Game of Thrones"
    },
    {
      "poster_path": "/vxuoMW6YBt6UsxvMfRNwRl9LtWS.jpg",
      "popularity": 25.172397,
      "id": 1402,
      "backdrop_path": "/zYFQM9G5j9cRsMNMuZAX64nmUMf.jpg",
      "vote_average": 7.38,
      "overview": "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way.",
      "first_air_date": "2010-10-31",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        10759,
        18
      ],
      "original_language": "en",
      "vote_count": 599,
      "name": "The Walking Dead",
      "original_name": "The Walking Dead"
    },
    {
      "poster_path": "/wQoosZYg9FqPrmI4zeCLRdEbqAB.jpg",
      "popularity": 24.933765,
      "id": 1418,
      "backdrop_path": "/nGsNruW3W27V6r4gkyc3iiEGsKR.jpg",
      "vote_average": 7.21,
      "overview": "The Big Bang Theory is centered on five characters living in Pasadena, California: roommates Leonard Hofstadter and Sheldon Cooper; Penny, a waitress and aspiring actress who lives across the hall; and Leonard and Sheldon's equally geeky and socially awkward friends and co-workers, mechanical engineer Howard Wolowitz and astrophysicist Raj Koothrappali. The geekiness and intellect of the four guys is contrasted for comic effect with Penny's social skills and common sense.",
      "first_air_date": "2007-09-24",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        35
      ],
      "original_language": "en",
      "vote_count": 597,
      "name": "The Big Bang Theory",
      "original_name": "The Big Bang Theory"
    },
    {
      "poster_path": "/igDhbYQTvact1SbNDbzoeiFBGda.jpg",
      "popularity": 22.509632,
      "id": 57243,
      "backdrop_path": "/cVWsigSx97cTw1QfYFFsCMcR4bp.jpg",
      "vote_average": 7.16,
      "overview": "The Doctor looks and seems human. He's handsome, witty, and could be mistaken for just another man in the street. But he is a Time Lord: a 900 year old alien with 2 hearts, part of a gifted civilization who mastered time travel. The Doctor saves planets for a living – more of a hobby actually, and he's very, very good at it. He's saved us from alien menaces and evil from before time began – but just who is he?",
      "first_air_date": "2005-03-26",
      "origin_country": [
        "GB"
      ],
      "genre_ids": [
        28,
        12,
        18,
        878
      ],
      "original_language": "en",
      "vote_count": 251,
      "name": "Doctor Who",
      "original_name": "Doctor Who"
    },
    {
      "poster_path": "/cCDuZqLv6jwnf3cZZq7g3uNLaIu.jpg",
      "popularity": 21.734193,
      "id": 62286,
      "backdrop_path": "/okhLwP26UXHJ4KYGVsERQqp3129.jpg",
      "vote_average": 6.23,
      "overview": "What did the world look like as it was transforming into the horrifying apocalypse depicted in \"The Walking Dead\"? This spin-off set in Los Angeles, following new characters as they face the beginning of the end of the world, will answer that question.",
      "first_air_date": "2015-08-23",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18,
        27
      ],
      "original_language": "en",
      "vote_count": 160,
      "name": "Fear the Walking Dead",
      "original_name": "Fear the Walking Dead"
    },
    {
      "poster_path": "/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg",
      "popularity": 21.173765,
      "id": 1396,
      "backdrop_path": "/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg",
      "vote_average": 8.1,
      "overview": "Breaking Bad is an American crime drama television series created and produced by Vince Gilligan. Set and produced in Albuquerque, New Mexico, Breaking Bad is the story of Walter White, a struggling high school chemistry teacher who is diagnosed with inoperable lung cancer at the beginning of the series. He turns to a life of crime, producing and selling methamphetamine, in order to secure his family's financial future before he dies, teaming with his former student, Jesse Pinkman. Heavily serialized, the series is known for positioning its characters in seemingly inextricable corners and has been labeled a contemporary western by its creator.",
      "first_air_date": "2008-01-19",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18
      ],
      "original_language": "en",
      "vote_count": 690,
      "name": "Breaking Bad",
      "original_name": "Breaking Bad"
    },
    {
      "poster_path": "/v9zc0cZpy5aPSfAy6Tgb6I1zWgV.jpg",
      "popularity": 19.140976,
      "id": 2190,
      "backdrop_path": "/mWsbqSspO5n5dsvfhduKcAlj4vu.jpg",
      "vote_average": 7.63,
      "overview": "Follows the misadventures of four irreverent grade-schoolers in the quiet, dysfunctional town of South Park, Colorado.",
      "first_air_date": "1997-08-13",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        35,
        16
      ],
      "original_language": "en",
      "vote_count": 153,
      "name": "South Park",
      "original_name": "South Park"
    },
    {
      "poster_path": "/i1zeXFOoHsEiNYsHii3ebS1Pnmz.jpg",
      "popularity": 18.222092,
      "id": 693,
      "backdrop_path": "/8926LtRZhlAUrpCSnwrI6MXCqDH.jpg",
      "vote_average": 6.42,
      "overview": "Desperate Housewives is an American television comedy-drama-mystery series created by Marc Cherry and produced by ABC Studios and Cherry Productions. It aired Sundays at 9 P.M. Eastern/8 P.M. Central, on ABC from October 3, 2004, until May 13, 2012. Executive producer Cherry served as showrunner. Other executive producers since the fourth season included Bob Daily, George W. Perkins, John Pardee, Joey Murphy, David Grossman, and Larry Shaw.\n\nThe main setting of the show was Wisteria Lane, a street in the fictional American town of 'Fairview' in the fictional 'Eagle State'. The show followed the lives of a group of women as seen through the eyes of a dead neighbor who committed suicide in the very first episode. The storyline covers thirteen years of the women's lives over eight seasons, set between the years 2004–2008, and later 2013–2017. They worked through domestic struggles and family life, while facing the secrets, crimes and mysteries hidden behind the doors of their — at the surface — beautiful and seemingly perfect suburban neighborhood.\n\nThe show featured an ensemble cast, headed by Teri Hatcher as Susan Mayer, Felicity Huffman as Lynette Scavo, Marcia Cross as Bree Van de Kamp, and Eva Longoria as Gabrielle Solis. Brenda Strong narrated the show as the deceased Mary Alice Young, appearing sporadically in flashbacks or dream sequences.",
      "first_air_date": "2004-10-03",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        9648,
        18,
        35
      ],
      "original_language": "en",
      "vote_count": 43,
      "name": "Desperate Housewives",
      "original_name": "Desperate Housewives"
    },
    {
      "poster_path": "/yTZQkSsxUFJZJe67IenRM0AEklc.jpg",
      "popularity": 17.908016,
      "id": 456,
      "backdrop_path": "/f5uNbUC76oowt5mt5J9QlqrIYQ6.jpg",
      "vote_average": 7.3,
      "overview": "Set in Springfield, the average American town, the show focuses on the antics and everyday adventures of the Simpson family; Homer, Marge, Bart, Lisa and Maggie, as well as a virtual cast of thousands. Since the beginning, the series has been a pop culture icon, attracting hundreds of celebrities to guest star. The show has also made name for itself in its fearless satirical take on politics, media and American life in general.",
      "first_air_date": "1989-12-16",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        35,
        16,
        10751
      ],
      "original_language": "en",
      "vote_count": 298,
      "name": "The Simpsons",
      "original_name": "The Simpsons"
    },
    {
      "poster_path": "/7Fwo5d29j374khrFJQ7cs5U69cv.jpg",
      "popularity": 17.133592,
      "id": 45253,
      "backdrop_path": "/r8qkc5No5PC75x88PJ5vEdwwQpX.jpg",
      "vote_average": 4.3,
      "overview": "The Super Sentai Series is the name given to the long-running Japanese superhero team genre of shows produced by Toei Co., Ltd., Toei Agency and Bandai, and aired by TV Asahi. The shows are of the tokusatsu genre, featuring live action characters and colorful special effects, and are aimed mainly at children. The Super Sentai Series is one of the most prominent tokusatsu productions in Japan, alongside the Ultra Series and the Kamen Rider Series, which it currently airs alongside in the Super Hero Time programming block on Sundays. Outside Japan, the Super Sentai Series are best known as the source material for the Power Rangers franchise.",
      "first_air_date": "1975-04-05",
      "origin_country": [
        "JP"
      ],
      "genre_ids": [
        12,
        10759,
        10765
      ],
      "original_language": "ja",
      "vote_count": 10,
      "name": "Super Sentai",
      "original_name": "スーパー戦隊シリーズ"
    },
    {
      "poster_path": "/7XFZOcYiBuFDrhqGrEoawF0T30l.jpg",
      "popularity": 16.649778,
      "id": 1411,
      "backdrop_path": "/wJ1D6uvKmc5sqqdYfyNmWMMxS22.jpg",
      "vote_average": 7.11,
      "overview": "Person of Interest follows former CIA paramilitary operative, John Reese, who is presumed dead and teams up with reclusive billionaire Finch to prevent violent crimes in New York City by initiating their own type of justice. With the special training that Reese has had in Covert Operations and Finch's genius software inventing mind, the two are a perfect match for the job that they have to complete. With the help of surveillance equipment, they work \"outside the law\" and get the right criminal behind bars. ",
      "first_air_date": "2011-09-22",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        28,
        12,
        18,
        9648,
        53
      ],
      "original_language": "en",
      "vote_count": 185,
      "name": "Person of Interest",
      "original_name": "Person of Interest"
    },
    {
      "poster_path": "/aI4bobthe7OORg4s2zjm0f0FdC1.jpg",
      "popularity": 16.155372,
      "id": 1416,
      "backdrop_path": "/rIu4XdgSV50B6nhgUuEPuufHsB2.jpg",
      "vote_average": 5.74,
      "overview": "Follows the personal and professional lives of a group of doctors at Seattle’s Grey Sloan Memorial Hospital.",
      "first_air_date": "2005-03-27",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18
      ],
      "original_language": "en",
      "vote_count": 119,
      "name": "Grey's Anatomy",
      "original_name": "Grey's Anatomy"
    },
    {
      "poster_path": "/3kl2oI6fhAio35wtz0EkRA3M4Of.jpg",
      "popularity": 15.951948,
      "id": 47640,
      "backdrop_path": "/5WDUW025SEZktkDkbqPA6upFWxK.jpg",
      "vote_average": 7.08,
      "overview": "The Strain is a high concept thriller that tells the story of Dr. Ephraim Goodweather, the head of the Center for Disease Control Canary Team in New York City. He and his team are called upon to investigate a mysterious viral outbreak with hallmarks of an ancient and evil strain of vampirism. As the strain spreads, Eph, his team, and an assembly of everyday New Yorkers, wage war for the fate of humanity itself.",
      "first_air_date": "2014-07-13",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        878,
        18,
        9648
      ],
      "original_language": "en",
      "vote_count": 90,
      "name": "The Strain",
      "original_name": "The Strain"
    },
    {
      "poster_path": "/u0cLcBQITrYqfHsn06fxnQwtqiE.jpg",
      "popularity": 15.71135,
      "id": 1398,
      "backdrop_path": "/8GZ91vtbYOMp05qruAGPezWC0Ja.jpg",
      "vote_average": 7.87,
      "overview": "The Sopranos is an American television drama created by David Chase. The series revolves around the New Jersey-based Italian-American mobster Tony Soprano and the difficulties he faces as he tries to balance the conflicting requirements of his home life and the criminal organization he heads. Those difficulties are often highlighted through his ongoing professional relationship with psychiatrist Jennifer Melfi. The show features Tony's family members and Mafia associates in prominent roles and story arcs, most notably his wife Carmela and his cousin and protégé Christopher Moltisanti.",
      "first_air_date": "1999-01-10",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18
      ],
      "original_language": "en",
      "vote_count": 121,
      "name": "The Sopranos",
      "original_name": "The Sopranos"
    },
    {
      "poster_path": "/3iFm6Kz7iYoFaEcj4fLyZHAmTQA.jpg",
      "popularity": 15.645593,
      "id": 1622,
      "backdrop_path": "/o9OKe3M06QMLOzTl3l6GStYtnE9.jpg",
      "vote_average": 6.82,
      "overview": "When they were boys, Sam and Dean Winchester lost their mother to a mysterious and demonic supernatural force. Subsequently, their father raised them to be soldiers. He taught them about the paranormal evil that lives in the dark corners and on the back roads of America ... and he taught them how to kill it. Now, the Winchester brothers crisscross the country in their '67 Chevy Impala, battling every kind of supernatural threat they encounter along the way. ",
      "first_air_date": "2005-09-13",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18,
        9648,
        10765
      ],
      "original_language": "en",
      "vote_count": 278,
      "name": "Supernatural",
      "original_name": "Supernatural"
    },
    {
      "poster_path": "/rtvezj8Z2NVE9fu83YOU1HimwYP.jpg",
      "popularity": 15.565902,
      "id": 2458,
      "backdrop_path": "/xcIvrXzBaky8umxxHSzb1VaXUZH.jpg",
      "vote_average": 6.24,
      "overview": "CSI: NY is an American police procedural television series that ran on CBS from September 22, 2004 to February 22, 2013 for a total of nine seasons and 197 original episodes. The show follows the investigations of a team of NYPD forensic scientists and police officers identified as \"Crime Scene Investigators\".",
      "first_air_date": "2004-09-21",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18,
        9648
      ],
      "original_language": "en",
      "vote_count": 29,
      "name": "CSI: NY",
      "original_name": "CSI: NY"
    },
    {
      "poster_path": "/2eALZgo89aHezKDRjZMveRjD5gc.jpg",
      "popularity": 15.40679,
      "id": 52,
      "backdrop_path": "/vBCZI4LTOVMGIlrBPhD1LQjDYtY.jpg",
      "vote_average": 7.13,
      "overview": "That '70s Show is an American television period sitcom that originally aired on Fox from August 23, 1998, to May 18, 2006. The series focused on the lives of a group of teenage friends living in the fictional suburban town of Point Place, Wisconsin, from May 17, 1976, to December 31, 1979.\n\nThe main teenage cast members were Topher Grace, Mila Kunis, Ashton Kutcher, Danny Masterson, Laura Prepon, and Wilmer Valderrama. The main adult cast members were Debra Jo Rupp, Kurtwood Smith, Don Stark and, during the first three seasons, Tanya Roberts.",
      "first_air_date": "1998-08-23",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        35
      ],
      "original_language": "en",
      "vote_count": 61,
      "name": "That '70s Show",
      "original_name": "That '70s Show"
    }
  ],
  "total_results": 20000,
  "total_pages": 1000
}
 */

/* tv/top_rated?		- Example

{
  "page": 1,
  "results": [
    {
      "poster_path": "/tfdiVvJkYMbUOXDWibPjzu5dY6S.jpg",
      "popularity": 1.722162,
      "id": 604,
      "backdrop_path": "/hHwEptckXUwZM7XO2lxZ8w8upuU.jpg",
      "vote_average": 8.17,
      "overview": "Teen Titans is an American animated television series based on the DC Comics characters of the same name, primarily the run of stories by Marv Wolfman and George Pérez in the early-1980s The New Teen Titans comic book series. The show was created by Glen Murakami, developed by David Slack, and produced by Warner Bros. Animation. It premiered on Cartoon Network on July 19, 2003 with the episode \"Divide and Conquer\" and the final episode \"Things Change\" aired on January 16, 2006, with the film Teen Titans: Trouble in Tokyo serving as the series finale. A comic book series, Teen Titans Go!, was based on the TV series. On June 8, 2012, it was announced that the series would be revived as Teen Titans Go! in April 23, 2013 and air on the DC Nation block.IT now airs on the Boomerang channel. ",
      "first_air_date": "2003-07-19",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        16,
        10759
      ],
      "original_language": "en",
      "vote_count": 12,
      "name": "Teen Titans",
      "original_name": "Teen Titans"
    },
    {
      "poster_path": "/utOLkQhxuhwN3PN0UEPnfhJnkrf.jpg",
      "popularity": 1.530522,
      "id": 2085,
      "backdrop_path": "/mzpeRh7Wu9mP3s9EdsbNMaGsykP.jpg",
      "vote_average": 8.16,
      "overview": "Courage the Cowardly Dog is an American comedy horror animated television series created by John R. Dilworth for Cartoon Network. Its central plot revolves around a somewhat anthropomorphic pink/purple dog named Courage who lives with his owners, Muriel and Eustace Bagge, an elderly, married farming couple in the \"Middle of Nowhere\". Courage and his owners are frequently thrown into bizarre misadventures, often involving the paranormal/supernatural and various villains. The show is known for its surreal, often disquieting humor and bizarre plot twists. The series combines elements of comedy horror, science fantasy, and drama.\n\nThe program originated from a short on Cartoon Network's animation showcase series created by Hanna-Barbera president Fred Seibert, \"What a Cartoon!\" titled \"The Chicken from Outer Space\". The segment was nominated for an Academy Award in 1996, and Cartoon Network commissioned a series based on the short. The series, which premiered on November 12, 1999, ran for four seasons, ending on November 22, 2002 with a total of 52 episodes produced. The series was the sixth and final series to be spun off from World Premiere Toons, and it was the eighth series to fall under the Cartoon Cartoons label.",
      "first_air_date": "1999-11-12",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        10765,
        16,
        9648,
        35
      ],
      "original_language": "en",
      "vote_count": 19,
      "name": "Coraje, El Perro Cobarde",
      "original_name": "Coraje, El Perro Cobarde"
    },
    {
      "poster_path": "/1yeVJox3rjo2jBKrrihIMj7uoS9.jpg",
      "popularity": 21.173765,
      "id": 1396,
      "backdrop_path": "/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg",
      "vote_average": 8.1,
      "overview": "Breaking Bad is an American crime drama television series created and produced by Vince Gilligan. Set and produced in Albuquerque, New Mexico, Breaking Bad is the story of Walter White, a struggling high school chemistry teacher who is diagnosed with inoperable lung cancer at the beginning of the series. He turns to a life of crime, producing and selling methamphetamine, in order to secure his family's financial future before he dies, teaming with his former student, Jesse Pinkman. Heavily serialized, the series is known for positioning its characters in seemingly inextricable corners and has been labeled a contemporary western by its creator.",
      "first_air_date": "2008-01-19",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18
      ],
      "original_language": "en",
      "vote_count": 690,
      "name": "Breaking Bad",
      "original_name": "Breaking Bad"
    },
    {
      "poster_path": "/esKFbCWAGyUUNshT5HE5BIpvbcL.jpg",
      "popularity": 9.911993,
      "id": 66732,
      "backdrop_path": "/6c4weB3UycHwPgzv31Awt7nku9y.jpg",
      "vote_average": 8.08,
      "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      "first_air_date": "2016-07-15",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18,
        9648,
        10765
      ],
      "original_language": "en",
      "vote_count": 77,
      "name": "Stranger Things",
      "original_name": "Stranger Things"
    },
    {
      "poster_path": "/mWNadwBZIx8NyEw4smGftYtHHrE.jpg",
      "popularity": 9.972256,
      "id": 1437,
      "backdrop_path": "/qlJB8bkK1JXAQ0m02OYS1ArS6DZ.jpg",
      "vote_average": 7.95,
      "overview": "Firefly is set in the year 2517, after the arrival of humans in a new star system and follows the adventures of the renegade crew of Serenity, a \"Firefly-class\" spaceship. The ensemble cast portrays the nine characters who live on Serenity.",
      "first_air_date": "2002-09-20",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        37,
        18,
        10759,
        10765
      ],
      "original_language": "en",
      "vote_count": 172,
      "name": "Firefly",
      "original_name": "Firefly"
    },
    {
      "poster_path": "/vHXZGe5tz4fcrqki9ZANkJISVKg.jpg",
      "popularity": 9.623731,
      "id": 19885,
      "backdrop_path": "/d6Aidd0YoC2WYEYSJRAl63kQnYK.jpg",
      "vote_average": 7.94,
      "overview": "A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.",
      "first_air_date": "2010-07-25",
      "origin_country": [
        "GB"
      ],
      "genre_ids": [
        80,
        18,
        9648
      ],
      "original_language": "en",
      "vote_count": 270,
      "name": "Sherlock",
      "original_name": "Sherlock"
    },
    {
      "poster_path": "/jIhL6mlT7AblhbHJgEoiBIOUVl1.jpg",
      "popularity": 29.780826,
      "id": 1399,
      "backdrop_path": "/mUkuc2wyV9dHLG0D0Loaw5pO2s8.jpg",
      "vote_average": 7.91,
      "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
      "first_air_date": "2011-04-17",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        10765,
        10759,
        18
      ],
      "original_language": "en",
      "vote_count": 1172,
      "name": "Game of Thrones",
      "original_name": "Game of Thrones"
    },
    {
      "poster_path": "/u0cLcBQITrYqfHsn06fxnQwtqiE.jpg",
      "popularity": 15.71135,
      "id": 1398,
      "backdrop_path": "/8GZ91vtbYOMp05qruAGPezWC0Ja.jpg",
      "vote_average": 7.87,
      "overview": "The Sopranos is an American television drama created by David Chase. The series revolves around the New Jersey-based Italian-American mobster Tony Soprano and the difficulties he faces as he tries to balance the conflicting requirements of his home life and the criminal organization he heads. Those difficulties are often highlighted through his ongoing professional relationship with psychiatrist Jennifer Melfi. The show features Tony's family members and Mafia associates in prominent roles and story arcs, most notably his wife Carmela and his cousin and protégé Christopher Moltisanti.",
      "first_air_date": "1999-01-10",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18
      ],
      "original_language": "en",
      "vote_count": 121,
      "name": "The Sopranos",
      "original_name": "The Sopranos"
    },
    {
      "poster_path": "/4ukKkwZWDSCxdXKBWUEfLSuHWmS.jpg",
      "popularity": 3.7503,
      "id": 64439,
      "backdrop_path": "/28hMBZGoeKaz6LoNbztlDIoUQH9.jpg",
      "vote_average": 7.83,
      "overview": "Set in Americas Heartland, Making a Murderer follows the harrowing story of Steven Avery, an outsider from the wrong side of the tracks, convicted and later exonerated of a brutal assault. His release triggered major criminal justice reform legislation, and he filed a lawsuit that threatened to expose corruption in local law enforcement and award him millions of dollars. But in the midst of his very public civil case, he suddenly finds himself the prime suspect in a grisly new crime.",
      "first_air_date": "2015-12-18",
      "origin_country": [],
      "genre_ids": [
        99
      ],
      "original_language": "en",
      "vote_count": 30,
      "name": "Making a Murderer",
      "original_name": "Making a Murderer"
    },
    {
      "poster_path": "/ydmfheI5cJ4NrgcupDEwk8I8y5q.jpg",
      "popularity": 11.085982,
      "id": 1405,
      "backdrop_path": "/kgadTwNJYYGZ7LTrw9X7KDiRCfV.jpg",
      "vote_average": 7.79,
      "overview": "Dexter is an American television drama series. The series centers on Dexter Morgan, a blood spatter pattern analyst for 'Miami Metro Police Department' who also leads a secret life as a serial killer, hunting down criminals who have slipped through the cracks of justice.",
      "first_air_date": "2006-10-01",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18,
        9648
      ],
      "original_language": "en",
      "vote_count": 250,
      "name": "Dexter",
      "original_name": "Dexter"
    },
    {
      "poster_path": "/egrBNjbMKbUao19dJcSNiw4xlft.jpg",
      "popularity": 7.195255,
      "id": 46648,
      "backdrop_path": "/qDEIZWnyRxWTB9zCjyyj4mbURVp.jpg",
      "vote_average": 7.77,
      "overview": "An American anthology police detective series utilizing multiple timelines in which investigations seem to unearth personal and professional secrets of those involved, both within or outside the law.",
      "first_air_date": "2014-01-12",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18
      ],
      "original_language": "en",
      "vote_count": 226,
      "name": "True Detective",
      "original_name": "True Detective"
    },
    {
      "poster_path": "/aYVBoq5MEtOBLlivSzDSpteZfXV.jpg",
      "popularity": 2.733919,
      "id": 31911,
      "backdrop_path": "/c368lahfH9sgdDHKp6ds7EprIga.jpg",
      "vote_average": 7.77,
      "overview": "Edward and Alphonse Elric's reckless disregard for alchemy's fun­damental laws ripped half of Ed's limbs from his body and left Al's soul clinging to a cold suit of armor. To restore what was lost, the brothers scour a war-torn land for the Philosopher's Sto­ne, a fabled relic which grants the ability to perform alchemy in impossible ways.\n\nThe Elrics are not alone in their search; the corrupt State Military is also eager to harness the artifact's power. So too are the strange Homunculi and their shadowy creator. The mythical gem lures exotic alchemists from distant kingdoms, scarring some deeply enough to inspire murder. As the Elrics find their course altered by these enemies and allies, their purpose remains unchanged – and their bond unbreakable.",
      "first_air_date": "2009-04-05",
      "origin_country": [
        "JP"
      ],
      "genre_ids": [
        16,
        18,
        10759,
        9648
      ],
      "original_language": "ja",
      "vote_count": 30,
      "name": "Fullmetal Alchemist: Brotherhood",
      "original_name": "鋼の錬金術師 FULLMETAL ALCHEMIST"
    },
    {
      "poster_path": "/wJKH0MHSvn3vS9fz9wF5IFpoquj.jpg",
      "popularity": 1.580899,
      "id": 1063,
      "backdrop_path": "/dYMycqFrk5AvRPczyAOwxAJv2TK.jpg",
      "vote_average": 7.76,
      "overview": "Mugen is a ferocious, animalistic warrior with a fighting style inspired by break-dancing. Jin is a ronin samurai who wanders the countryside alone. They may not be friends, but their paths continually cross. And when ditzy waitress Fuu gets them out of hot water with the local magistrate, they agree to join her search for the samurai who smells like sunflowers.",
      "first_air_date": "2004-05-20",
      "origin_country": [
        "JP"
      ],
      "genre_ids": [
        16,
        28,
        12
      ],
      "original_language": "ja",
      "vote_count": 17,
      "name": "Samurai Champloo",
      "original_name": "サムライチャンプルー"
    },
    {
      "poster_path": "/qen4mgSun5wy8fgSwXNR23surMM.jpg",
      "popularity": 1.395938,
      "id": 39218,
      "backdrop_path": "/rYIlgL5u4E7Jp1fyGKPOJYsSVWv.jpg",
      "vote_average": 7.75,
      "overview": "Madoka Kaname leads a happy life with her family and friends whilst attending Mitakihara School. One day, a magical creature called Kyuubey implores Madoka for help and from then on, she is drawn into a parallel world where magical girls battle against witches.",
      "first_air_date": "2011-01-07",
      "origin_country": [
        "JP"
      ],
      "genre_ids": [
        16,
        18,
        9648,
        10765
      ],
      "original_language": "ja",
      "vote_count": 10,
      "name": "Puella Magi Madoka Magica",
      "original_name": "魔法少女まどか☆マギカ"
    },
    {
      "poster_path": "/6wzfCXg2I2LBuaEjh7fkMHXBR9i.jpg",
      "popularity": 3.373494,
      "id": 1920,
      "backdrop_path": "/3Y91NnZZyTS8UbgJUw3AZ6WWKTN.jpg",
      "vote_average": 7.75,
      "overview": "The body of Laura Palmer is washed up on a beach near the small Washington state town of Twin Peaks. FBI Special Agent Dale Cooper is called in to investigate her strange demise only to uncover a web of mystery that ultimately leads him deep into the heart of the surrounding woodland and his very own soul.",
      "first_air_date": "1990-04-08",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18,
        9648,
        53
      ],
      "original_language": "en",
      "vote_count": 62,
      "name": "Twin Peaks",
      "original_name": "Twin Peaks"
    },
    {
      "poster_path": "/lxSzRZ49NXwsiyHuvMsd19QxduC.jpg",
      "popularity": 12.394738,
      "id": 1408,
      "backdrop_path": "/6r5o8yvLx7nESRBC1iMuYBCk9Cj.jpg",
      "vote_average": 7.75,
      "overview": "Dr. Gregory House, a drug-addicted, unconventional, misanthropic medical genius, leads a team of diagnosticians at the fictional Princeton–Plainsboro Teaching Hospital in New Jersey.",
      "first_air_date": "2004-11-16",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        18,
        35,
        9648
      ],
      "original_language": "en",
      "vote_count": 171,
      "name": "House",
      "original_name": "House"
    },
    {
      "poster_path": "/dg7NuKDjmS6OzuNy33qt8kSkPA1.jpg",
      "popularity": 4.51393,
      "id": 1438,
      "backdrop_path": "/4hWfYN3wiOZZXC7t6B70BF9iUvk.jpg",
      "vote_average": 7.75,
      "overview": "The Wire is an American television crime drama series set and produced in and around Baltimore, Maryland. Each season of The Wire introduces a different facet of the city of Baltimore. In chronological order they are: the illegal drug trade, the seaport system, the city government and bureaucracy, the school system, and the print news media.\n\nDespite only receiving average ratings and never winning major television awards, The Wire has been described by many critics and fans as one of the greatest TV dramas of all time. The show is recognized for its realistic portrayal of urban life, its literary ambitions, and its uncommonly deep exploration of sociopolitical themes.",
      "first_air_date": "2002-06-02",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        80,
        18,
        9648
      ],
      "original_language": "en",
      "vote_count": 100,
      "name": "The Wire",
      "original_name": "The Wire"
    },
    {
      "poster_path": "/iiYFBpjAbQUzsu0k4LDvWqBiQzI.jpg",
      "popularity": 2.855247,
      "id": 2490,
      "backdrop_path": "/fZoj7ZMLbBQjC8MvQjZ3XuzqLwp.jpg",
      "vote_average": 7.73,
      "overview": "UK Comedy series about two I.T. nerds and their clueless female manager, who work in the basement of a very successful company. When they are called on for help, they are never treated with any respect at all.",
      "first_air_date": "2006-02-03",
      "origin_country": [
        "GB"
      ],
      "genre_ids": [
        35,
        18
      ],
      "original_language": "en",
      "vote_count": 81,
      "name": "The IT Crowd",
      "original_name": "The IT Crowd"
    },
    {
      "poster_path": "/boh1E1atURBdHXjboTnWOKIfWKb.jpg",
      "popularity": 1.369815,
      "id": 3579,
      "backdrop_path": "/2GWeOe5dhM3BtK94FZ2vjXACvam.jpg",
      "vote_average": 7.73,
      "overview": "The Angry Beavers is an American animated television series created by Mitch Schauer for the Nickelodeon channel. The series revolves around Daggett and Norbert Beaver, two young beaver brothers who have left their home to become bachelors in the forest near the fictional Wayouttatown, Oregon. The show premiered in the United States on April 19, 1997. The show started airing on the Nickelodeon Canada channel when it launched on November 2, 2009. The series aired on The '90s Are All That block on TeenNick in the US on October 7, 2011 as part of the block's U Pick with Stick line-up. The series was also up for a U Pick with Stick showdown on The '90s Are All That for the weekend of February 3, 2012, but lost to Rocko's Modern Life and did not air. The series was added to the Sunday line-up on The '90s Are All That on TeenNick, and aired from February 10, 2013, to March 3, 2013. The series returned to The '90s Are All That on TeenNick on March 25, 2013, but has since left the line-up again. The series is also currently being released on DVD.",
      "first_air_date": "1997-04-20",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        16,
        35,
        10751
      ],
      "original_language": "en",
      "vote_count": 11,
      "name": "The Angry Beavers",
      "original_name": "The Angry Beavers"
    },
    {
      "poster_path": "/sskPK2HjkFaxam10eg0Hk1A3I2m.jpg",
      "popularity": 6.055152,
      "id": 60622,
      "backdrop_path": "/qq1S5EjaaUrQAcMsn6raNFXpzHk.jpg",
      "vote_average": 7.72,
      "overview": "A close-knit anthology series dealing with stories involving malice, violence and murder based in and around Minnesota.",
      "first_air_date": "2014-04-15",
      "origin_country": [
        "US"
      ],
      "genre_ids": [
        80,
        18,
        53
      ],
      "original_language": "en",
      "vote_count": 118,
      "name": "Fargo",
      "original_name": "Fargo"
    }
  ],
  "total_results": 747,
  "total_pages": 38
}
 */

/* tv/{tv_id}/season/{season_number}?		- Example

{
  "_id": "5256c89f19c2956ff6046d47",
  "air_date": "2011-04-17",
  "episodes": [
    {
      "air_date": "2011-04-17",
      "crew": [
        {
          "id": 44797,
          "credit_id": "5256c8a219c2956ff6046e77",
          "name": "Tim Van Patten",
          "department": "Directing",
          "job": "Director",
          "profile_path": "/6b7l9YbkDHDOzOKUFNqBVaPjcgm.jpg"
        },
        {
          "id": 1318704,
          "credit_id": "54eef2429251417974005cb6",
          "name": "Alik Sakharov",
          "department": "Camera",
          "job": "Director of Photography",
          "profile_path": "/50ZlHkh66aOPxQMjQ21LJDAkYlR.jpg"
        },
        {
          "id": 18077,
          "credit_id": "54eef2ab925141795f005d4f",
          "name": "Oral Norrie Ottey",
          "department": "Editing",
          "job": "Editor",
          "profile_path": null
        },
        {
          "id": 9813,
          "credit_id": "5256c8a019c2956ff6046e2b",
          "name": "David Benioff",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
        },
        {
          "id": 228068,
          "credit_id": "5256c8a219c2956ff6046e4b",
          "name": "D. B. Weiss",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
        }
      ],
      "episode_number": 1,
      "guest_stars": [
        {
          "id": 117642,
          "name": "Jason Momoa",
          "credit_id": "5256c8a219c2956ff6046f40",
          "character": "Khal Drogo",
          "order": 0,
          "profile_path": "/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg"
        },
        {
          "id": 946696,
          "name": "Ian Whyte",
          "credit_id": "5750cd459251412b0f000224",
          "character": "White Walker",
          "order": 46,
          "profile_path": "/6mRY7hTtHfDTGuTLmZmODOu9buF.jpg"
        },
        {
          "id": 438859,
          "name": "Susan Brown",
          "credit_id": "57520bc19251414c470000de",
          "character": "Septa Mordane",
          "order": 52,
          "profile_path": "/5bYvoJDOw4okAzSxJ1avXweUyA9.jpg"
        },
        {
          "id": 1833,
          "name": "Jamie Sives",
          "credit_id": "5752136f9251414c510001a0",
          "character": "Jory Cassel",
          "order": 55,
          "profile_path": "/92BcXrr2W7gZri6xVlLhpLLaPsf.jpg"
        },
        {
          "id": 234907,
          "name": "Dar Salim",
          "credit_id": "5752158b9251414c470001c0",
          "character": "Qotho",
          "order": 56,
          "profile_path": "/3CrPTwZJ0hsWzX7oi7sKFfzDo82.jpg"
        },
        {
          "id": 11279,
          "name": "Roger Allam",
          "credit_id": "575216bdc3a36851fe0001d8",
          "character": "Illyrio Mopatis",
          "order": 57,
          "profile_path": "/gr59GfVZz9QV6jZyHKOsKCBxXPr.jpg"
        },
        {
          "id": 1600544,
          "name": "Aimee Richardson",
          "credit_id": "57521d4cc3a3685215000344",
          "character": "Myrcella Baratheon",
          "order": 60,
          "profile_path": "/r53KnAfLiR8NaK3Kp2Nu4q0KSoP.jpg"
        },
        {
          "id": 1600543,
          "name": "Callum Wharry",
          "credit_id": "57521fafc3a368521500041d",
          "character": "Tommen Baratheon",
          "order": 61,
          "profile_path": "/rVaMQfGwylZWWM2eRJ3qAEkS0tK.jpg"
        }
      ],
      "name": "Winter Is Coming",
      "overview": "Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon's place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.",
      "id": 63056,
      "production_code": "101",
      "season_number": 1,
      "still_path": "/wrGWeW4WKxnaeA8sxJb2T9O6ryo.jpg",
      "vote_average": 7.11904761904762,
      "vote_count": 21
    },
    {
      "air_date": "2011-04-24",
      "crew": [
        {
          "id": 44797,
          "credit_id": "5256c8a219c2956ff6046e77",
          "name": "Tim Van Patten",
          "department": "Directing",
          "job": "Director",
          "profile_path": "/6b7l9YbkDHDOzOKUFNqBVaPjcgm.jpg"
        },
        {
          "id": 1318704,
          "credit_id": "54eef2429251417974005cb6",
          "name": "Alik Sakharov",
          "department": "Camera",
          "job": "Director of Photography",
          "profile_path": "/50ZlHkh66aOPxQMjQ21LJDAkYlR.jpg"
        },
        {
          "id": 18077,
          "credit_id": "54eef2ab925141795f005d4f",
          "name": "Oral Norrie Ottey",
          "department": "Editing",
          "job": "Editor",
          "profile_path": null
        },
        {
          "id": 9813,
          "credit_id": "5256c8a019c2956ff6046e2b",
          "name": "David Benioff",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
        },
        {
          "id": 228068,
          "credit_id": "5256c8a219c2956ff6046e4b",
          "name": "D. B. Weiss",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
        }
      ],
      "episode_number": 2,
      "guest_stars": [
        {
          "id": 117642,
          "name": "Jason Momoa",
          "credit_id": "5256c8a219c2956ff6046f40",
          "character": "Khal Drogo",
          "order": 0,
          "profile_path": "/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg"
        },
        {
          "id": 225870,
          "name": "Wilko Johnson",
          "credit_id": "5750d240c3a3682fa000041c",
          "character": "Ilyn Payne",
          "order": 49,
          "profile_path": "/ofncvvhuucP8ip3x8duQEzhJrsT.jpg"
        },
        {
          "id": 1048692,
          "name": "Amrita Acharia",
          "credit_id": "5750d365925141087f0006e1",
          "character": "Irri",
          "order": 50,
          "profile_path": "/uwz4vjtIMxD9y7uq3CFpPjrznVR.jpg"
        },
        {
          "id": 228969,
          "name": "Roxanne McKee",
          "credit_id": "57520a4ac3a368520c0000aa",
          "character": "Doreah",
          "order": 51,
          "profile_path": "/oJYawHvbZM48lNTGWKATapFzplL.jpg"
        },
        {
          "id": 1833,
          "name": "Jamie Sives",
          "credit_id": "5752136f9251414c510001a0",
          "character": "Jory Cassel",
          "order": 55,
          "profile_path": "/92BcXrr2W7gZri6xVlLhpLLaPsf.jpg"
        },
        {
          "id": 234907,
          "name": "Dar Salim",
          "credit_id": "5752158b9251414c470001c0",
          "character": "Qotho",
          "order": 56,
          "profile_path": "/3CrPTwZJ0hsWzX7oi7sKFfzDo82.jpg"
        },
        {
          "id": 1600546,
          "name": "Luke Barnes",
          "credit_id": "57521aa7c3a3685204000294",
          "character": "Rast",
          "order": 59,
          "profile_path": "/s9WIklN7aqPJMnun0oxoO4QFb3C.jpg"
        },
        {
          "id": 1600544,
          "name": "Aimee Richardson",
          "credit_id": "57521d4cc3a3685215000344",
          "character": "Myrcella Baratheon",
          "order": 60,
          "profile_path": "/r53KnAfLiR8NaK3Kp2Nu4q0KSoP.jpg"
        },
        {
          "id": 1600543,
          "name": "Callum Wharry",
          "credit_id": "57521fafc3a368521500041d",
          "character": "Tommen Baratheon",
          "order": 61,
          "profile_path": "/rVaMQfGwylZWWM2eRJ3qAEkS0tK.jpg"
        }
      ],
      "name": "The Kingsroad",
      "overview": "While Bran recovers from his fall, Ned takes only his daughters to Kings Landing. Jon Snow goes with his uncle Benjen to The Wall. Tyrion joins them.",
      "id": 63057,
      "production_code": "102",
      "season_number": 1,
      "still_path": "/icjOgl5F9DhysOEo6Six2Qfwcu2.jpg",
      "vote_average": 7.375,
      "vote_count": 4
    },
    {
      "air_date": "2011-05-01",
      "crew": [
        {
          "id": 93223,
          "credit_id": "5256c8a219c2956ff6046f0b",
          "name": "Brian Kirk",
          "department": "Directing",
          "job": "Director",
          "profile_path": null
        },
        {
          "id": 59984,
          "credit_id": "54eef41d9251417971005b8d",
          "name": "Marco Pontecorvo",
          "department": "Camera",
          "job": "Director of Photography",
          "profile_path": null
        },
        {
          "id": 1204180,
          "credit_id": "54eef453c3a3680b80006153",
          "name": "Frances Parker",
          "department": "Editing",
          "job": "Editor",
          "profile_path": null
        },
        {
          "id": 9813,
          "credit_id": "5256c8a019c2956ff6046e2b",
          "name": "David Benioff",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
        },
        {
          "id": 228068,
          "credit_id": "5256c8a219c2956ff6046e4b",
          "name": "D. B. Weiss",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
        }
      ],
      "episode_number": 3,
      "guest_stars": [
        {
          "id": 386,
          "name": "Peter Vaughan",
          "credit_id": "57617dd692514156c2000046",
          "character": "Maester Aemon",
          "order": 63,
          "profile_path": "/z9ZplbTA1ojYhgZ8kJUKKhsJ7Gs.jpg"
        },
        {
          "id": 1600546,
          "name": "Luke Barnes",
          "credit_id": "57521aa7c3a3685204000294",
          "character": "Rast",
          "order": 59,
          "profile_path": "/s9WIklN7aqPJMnun0oxoO4QFb3C.jpg"
        },
        {
          "id": 1833,
          "name": "Jamie Sives",
          "credit_id": "5752136f9251414c510001a0",
          "character": "Jory Cassel",
          "order": 55,
          "profile_path": "/92BcXrr2W7gZri6xVlLhpLLaPsf.jpg"
        },
        {
          "id": 58654,
          "name": "Owen Teale",
          "credit_id": "5752114a9251414c5400013c",
          "character": "Alliser Thorne",
          "order": 54,
          "profile_path": "/cUxG0sgqNJXuRAbOCKsAqFLyRDi.jpg"
        },
        {
          "id": 438859,
          "name": "Susan Brown",
          "credit_id": "57520bc19251414c470000de",
          "character": "Septa Mordane",
          "order": 52,
          "profile_path": "/5bYvoJDOw4okAzSxJ1avXweUyA9.jpg"
        },
        {
          "id": 1048692,
          "name": "Amrita Acharia",
          "credit_id": "5750d365925141087f0006e1",
          "character": "Irri",
          "order": 50,
          "profile_path": "/uwz4vjtIMxD9y7uq3CFpPjrznVR.jpg"
        },
        {
          "id": 39661,
          "name": "Francis Magee",
          "credit_id": "5750d0ddc3a36818f1000489",
          "character": "Yoren",
          "order": 48,
          "profile_path": "/aHW0KktJ4u7MqeZ0ii11OkH3EIY.jpg"
        },
        {
          "id": 1399527,
          "name": "Miltos Yerolemou",
          "credit_id": "5750cf9a9251412b790002bb",
          "character": "Syrio Forel",
          "order": 47,
          "profile_path": "/iw0hivfHyuDLFPeLqWcbc9KNt7G.jpg"
        },
        {
          "id": 43554,
          "name": "Josef Altin",
          "credit_id": "5750c9f6c3a3682fa0000129",
          "character": "Pypar",
          "order": 43,
          "profile_path": "/lnr6IQUAyXP0y1oj7sEZgmNpzpL.jpg"
        },
        {
          "id": 1345950,
          "name": "Mark Stanley",
          "credit_id": "5750c8009251412b79000045",
          "character": "Grenn",
          "order": 42,
          "profile_path": "/y6Z9tXUxNRay8MEo2ZQPtXQJ05m.jpg"
        },
        {
          "id": 117642,
          "name": "Jason Momoa",
          "credit_id": "5256c8a219c2956ff6046f40",
          "character": "Khal Drogo",
          "order": 0,
          "profile_path": "/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg"
        }
      ],
      "name": "Lord Snow",
      "overview": "Lord Stark and his daughters arrive at King's Landing to discover the intrigues of the king's realm.",
      "id": 63058,
      "production_code": "103",
      "season_number": 1,
      "still_path": "/4vCYVtIhiYSUry1lviA7CKPUB5Z.jpg",
      "vote_average": 6.875,
      "vote_count": 4
    },
    {
      "air_date": "2011-05-08",
      "crew": [
        {
          "id": 93223,
          "credit_id": "5256c8a219c2956ff6046f0b",
          "name": "Brian Kirk",
          "department": "Directing",
          "job": "Director",
          "profile_path": null
        },
        {
          "id": 59984,
          "credit_id": "54eef41d9251417971005b8d",
          "name": "Marco Pontecorvo",
          "department": "Camera",
          "job": "Director of Photography",
          "profile_path": null
        },
        {
          "id": 1204180,
          "credit_id": "54eef453c3a3680b80006153",
          "name": "Frances Parker",
          "department": "Editing",
          "job": "Editor",
          "profile_path": null
        },
        {
          "id": 1223784,
          "credit_id": "5256c8a419c2956ff6046f62",
          "name": "Bryan Cogman",
          "department": "Writing",
          "job": "Writer",
          "profile_path": null
        }
      ],
      "episode_number": 4,
      "guest_stars": [
        {
          "id": 1600543,
          "name": "Callum Wharry",
          "credit_id": "57521fafc3a368521500041d",
          "character": "Tommen Baratheon",
          "order": 61,
          "profile_path": "/rVaMQfGwylZWWM2eRJ3qAEkS0tK.jpg"
        },
        {
          "id": 1600544,
          "name": "Aimee Richardson",
          "credit_id": "57521d4cc3a3685215000344",
          "character": "Myrcella Baratheon",
          "order": 60,
          "profile_path": "/r53KnAfLiR8NaK3Kp2Nu4q0KSoP.jpg"
        },
        {
          "id": 1600546,
          "name": "Luke Barnes",
          "credit_id": "57521aa7c3a3685204000294",
          "character": "Rast",
          "order": 59,
          "profile_path": "/s9WIklN7aqPJMnun0oxoO4QFb3C.jpg"
        },
        {
          "id": 1833,
          "name": "Jamie Sives",
          "credit_id": "5752136f9251414c510001a0",
          "character": "Jory Cassel",
          "order": 55,
          "profile_path": "/92BcXrr2W7gZri6xVlLhpLLaPsf.jpg"
        },
        {
          "id": 58654,
          "name": "Owen Teale",
          "credit_id": "5752114a9251414c5400013c",
          "character": "Alliser Thorne",
          "order": 54,
          "profile_path": "/cUxG0sgqNJXuRAbOCKsAqFLyRDi.jpg"
        },
        {
          "id": 438859,
          "name": "Susan Brown",
          "credit_id": "57520bc19251414c470000de",
          "character": "Septa Mordane",
          "order": 52,
          "profile_path": "/5bYvoJDOw4okAzSxJ1avXweUyA9.jpg"
        },
        {
          "id": 228969,
          "name": "Roxanne McKee",
          "credit_id": "57520a4ac3a368520c0000aa",
          "character": "Doreah",
          "order": 51,
          "profile_path": "/oJYawHvbZM48lNTGWKATapFzplL.jpg"
        },
        {
          "id": 1048692,
          "name": "Amrita Acharia",
          "credit_id": "5750d365925141087f0006e1",
          "character": "Irri",
          "order": 50,
          "profile_path": "/uwz4vjtIMxD9y7uq3CFpPjrznVR.jpg"
        },
        {
          "id": 39661,
          "name": "Francis Magee",
          "credit_id": "5750d0ddc3a36818f1000489",
          "character": "Yoren",
          "order": 48,
          "profile_path": "/aHW0KktJ4u7MqeZ0ii11OkH3EIY.jpg"
        },
        {
          "id": 127453,
          "name": "Conan Stevens",
          "credit_id": "5750cc09c3a368018b0004b2",
          "character": "Gregor Clegane",
          "order": 44,
          "profile_path": "/8mlrCTSXDInF15w6CO4IYgbPKg7.jpg"
        },
        {
          "id": 43554,
          "name": "Josef Altin",
          "credit_id": "5750c9f6c3a3682fa0000129",
          "character": "Pypar",
          "order": 43,
          "profile_path": "/lnr6IQUAyXP0y1oj7sEZgmNpzpL.jpg"
        },
        {
          "id": 1345950,
          "name": "Mark Stanley",
          "credit_id": "5750c8009251412b79000045",
          "character": "Grenn",
          "order": 42,
          "profile_path": "/y6Z9tXUxNRay8MEo2ZQPtXQJ05m.jpg"
        },
        {
          "id": 193335,
          "name": "Dominic Carter",
          "credit_id": "556b676592514173e0003e18",
          "character": "Janos Slynt",
          "order": 10,
          "profile_path": "/8Wu34kgPhGI00XnQlt3OOmZepHL.jpg"
        },
        {
          "id": 117642,
          "name": "Jason Momoa",
          "credit_id": "5256c8a219c2956ff6046f40",
          "character": "Khal Drogo",
          "order": 0,
          "profile_path": "/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg"
        }
      ],
      "name": "Cripples, Bastards, and Broken Things",
      "overview": "Eddard investigates Jon Arryn's murder. Jon befriends Samwell Tarly, a coward who has come to join the Night's Watch.",
      "id": 63059,
      "production_code": "104",
      "season_number": 1,
      "still_path": "/a4tO7cgpv9IkatqAsv5k20zzlyi.jpg",
      "vote_average": 8.3,
      "vote_count": 5
    },
    {
      "air_date": "2011-05-15",
      "crew": [
        {
          "id": 93223,
          "credit_id": "5256c8a219c2956ff6046f0b",
          "name": "Brian Kirk",
          "department": "Directing",
          "job": "Director",
          "profile_path": null
        },
        {
          "id": 59984,
          "credit_id": "54eef41d9251417971005b8d",
          "name": "Marco Pontecorvo",
          "department": "Camera",
          "job": "Director of Photography",
          "profile_path": null
        },
        {
          "id": 1204180,
          "credit_id": "54eef453c3a3680b80006153",
          "name": "Frances Parker",
          "department": "Editing",
          "job": "Editor",
          "profile_path": null
        },
        {
          "id": 9813,
          "credit_id": "5256c8a019c2956ff6046e2b",
          "name": "David Benioff",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
        },
        {
          "id": 228068,
          "credit_id": "5256c8a219c2956ff6046e4b",
          "name": "D. B. Weiss",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
        }
      ],
      "episode_number": 5,
      "guest_stars": [
        {
          "id": 1014926,
          "name": "Lino Facioli",
          "credit_id": "5750c267c3a36818f1000138",
          "character": "Robin Arryn",
          "order": 40,
          "profile_path": "/5OqKQqQBBu8TAEkw5y3rMlvKoS9.jpg"
        },
        {
          "id": 127453,
          "name": "Conan Stevens",
          "credit_id": "5750cc09c3a368018b0004b2",
          "character": "Gregor Clegane",
          "order": 44,
          "profile_path": "/8mlrCTSXDInF15w6CO4IYgbPKg7.jpg"
        },
        {
          "id": 39661,
          "name": "Francis Magee",
          "credit_id": "5750d0ddc3a36818f1000489",
          "character": "Yoren",
          "order": 48,
          "profile_path": "/aHW0KktJ4u7MqeZ0ii11OkH3EIY.jpg"
        },
        {
          "id": 438859,
          "name": "Susan Brown",
          "credit_id": "57520bc19251414c470000de",
          "character": "Septa Mordane",
          "order": 52,
          "profile_path": "/5bYvoJDOw4okAzSxJ1avXweUyA9.jpg"
        },
        {
          "id": 1833,
          "name": "Jamie Sives",
          "credit_id": "5752136f9251414c510001a0",
          "character": "Jory Cassel",
          "order": 55,
          "profile_path": "/92BcXrr2W7gZri6xVlLhpLLaPsf.jpg"
        },
        {
          "id": 11279,
          "name": "Roger Allam",
          "credit_id": "575216bdc3a36851fe0001d8",
          "character": "Illyrio Mopatis",
          "order": 57,
          "profile_path": "/gr59GfVZz9QV6jZyHKOsKCBxXPr.jpg"
        },
        {
          "id": 1600544,
          "name": "Aimee Richardson",
          "credit_id": "57521d4cc3a3685215000344",
          "character": "Myrcella Baratheon",
          "order": 60,
          "profile_path": "/r53KnAfLiR8NaK3Kp2Nu4q0KSoP.jpg"
        },
        {
          "id": 1600543,
          "name": "Callum Wharry",
          "credit_id": "57521fafc3a368521500041d",
          "character": "Tommen Baratheon",
          "order": 61,
          "profile_path": "/rVaMQfGwylZWWM2eRJ3qAEkS0tK.jpg"
        }
      ],
      "name": "The Wolf and the Lion",
      "overview": "Catelyn has captured Tyrion and plans to bring him to her sister, Lysa Arryn, at The Vale, to be tried for his, supposed, crimes against Bran. Robert plans to have Daenerys killed, but Eddard refuses to be a part of it and quits.",
      "id": 63060,
      "production_code": "105",
      "season_number": 1,
      "still_path": "/qS3CHz3AKaC6WhlxQuEXPdrEPjg.jpg",
      "vote_average": 7.25,
      "vote_count": 4
    },
    {
      "air_date": "2011-05-22",
      "crew": [
        {
          "id": 77213,
          "credit_id": "5256c8a519c2956ff604706c",
          "name": "Jane Espenson",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/kWXT8SGenskyFM65v5IByXqOHOp.jpg"
        },
        {
          "id": 88743,
          "credit_id": "5256c8a519c2956ff60470ac",
          "name": "Daniel Minahan",
          "department": "Directing",
          "job": "Director",
          "profile_path": null
        },
        {
          "id": 94545,
          "credit_id": "54eef670c3a3686d5e005571",
          "name": "Matthew Jensen",
          "department": "Camera",
          "job": "Director of Photography",
          "profile_path": null
        },
        {
          "id": 81827,
          "credit_id": "54eef67cc3a3680b80006196",
          "name": "Martin Nicholson",
          "department": "Editing",
          "job": "Editor",
          "profile_path": null
        },
        {
          "id": 9813,
          "credit_id": "5256c8a019c2956ff6046e2b",
          "name": "David Benioff",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
        },
        {
          "id": 228068,
          "credit_id": "5256c8a219c2956ff6046e4b",
          "name": "D. B. Weiss",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
        }
      ],
      "episode_number": 6,
      "guest_stars": [
        {
          "id": 3300,
          "name": "Natalia Tena",
          "credit_id": "5256c8a519c2956ff6046ff6",
          "character": "",
          "order": 0,
          "profile_path": "/A5977qcPr05zAQSqr7nKKSbJhpY.jpg"
        },
        {
          "id": 117642,
          "name": "Jason Momoa",
          "credit_id": "5256c8a219c2956ff6046f40",
          "character": "Khal Drogo",
          "order": 0,
          "profile_path": "/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg"
        },
        {
          "id": 740,
          "name": "Julian Glover",
          "credit_id": "5256c8a519c2956ff6047046",
          "character": "",
          "order": 1,
          "profile_path": "/2sQWrB4of8O2k7DGwJ3OdGJi2Mj.jpg"
        },
        {
          "id": 1014926,
          "name": "Lino Facioli",
          "credit_id": "5750c267c3a36818f1000138",
          "character": "Robin Arryn",
          "order": 40,
          "profile_path": "/5OqKQqQBBu8TAEkw5y3rMlvKoS9.jpg"
        },
        {
          "id": 1399527,
          "name": "Miltos Yerolemou",
          "credit_id": "5750cf9a9251412b790002bb",
          "character": "Syrio Forel",
          "order": 47,
          "profile_path": "/iw0hivfHyuDLFPeLqWcbc9KNt7G.jpg"
        },
        {
          "id": 1048692,
          "name": "Amrita Acharia",
          "credit_id": "5750d365925141087f0006e1",
          "character": "Irri",
          "order": 50,
          "profile_path": "/uwz4vjtIMxD9y7uq3CFpPjrznVR.jpg"
        },
        {
          "id": 228969,
          "name": "Roxanne McKee",
          "credit_id": "57520a4ac3a368520c0000aa",
          "character": "Doreah",
          "order": 51,
          "profile_path": "/oJYawHvbZM48lNTGWKATapFzplL.jpg"
        },
        {
          "id": 438859,
          "name": "Susan Brown",
          "credit_id": "57520bc19251414c470000de",
          "character": "Septa Mordane",
          "order": 52,
          "profile_path": "/5bYvoJDOw4okAzSxJ1avXweUyA9.jpg"
        },
        {
          "id": 234907,
          "name": "Dar Salim",
          "credit_id": "5752158b9251414c470001c0",
          "character": "Qotho",
          "order": 56,
          "profile_path": "/3CrPTwZJ0hsWzX7oi7sKFfzDo82.jpg"
        }
      ],
      "name": "A Golden Crown",
      "overview": "While recovering from his battle with Jamie, Eddard is forced to run the kingdom while Robert goes hunting. Tyrion demands a trial by combat for his freedom. Viserys is losing his patience with Drogo.",
      "id": 63061,
      "production_code": "106",
      "season_number": 1,
      "still_path": "/AqtTrDIHKB6USFUUxLiIWJ6LTes.jpg",
      "vote_average": 6.375,
      "vote_count": 4
    },
    {
      "air_date": "2011-05-29",
      "crew": [
        {
          "id": 88743,
          "credit_id": "5256c8a519c2956ff60470ac",
          "name": "Daniel Minahan",
          "department": "Directing",
          "job": "Director",
          "profile_path": null
        },
        {
          "id": 94545,
          "credit_id": "54eef670c3a3686d5e005571",
          "name": "Matthew Jensen",
          "department": "Camera",
          "job": "Director of Photography",
          "profile_path": null
        },
        {
          "id": 81827,
          "credit_id": "54eef67cc3a3680b80006196",
          "name": "Martin Nicholson",
          "department": "Editing",
          "job": "Editor",
          "profile_path": null
        },
        {
          "id": 228068,
          "credit_id": "5256c8a219c2956ff6046e4b",
          "name": "D. B. Weiss",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
        },
        {
          "id": 9813,
          "credit_id": "5256c8a019c2956ff6046e2b",
          "name": "David Benioff",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
        }
      ],
      "episode_number": 7,
      "guest_stars": [
        {
          "id": 386,
          "name": "Peter Vaughan",
          "credit_id": "57617dd692514156c2000046",
          "character": "Maester Aemon",
          "order": 63,
          "profile_path": "/z9ZplbTA1ojYhgZ8kJUKKhsJ7Gs.jpg"
        },
        {
          "id": 1600546,
          "name": "Luke Barnes",
          "credit_id": "57521aa7c3a3685204000294",
          "character": "Rast",
          "order": 59,
          "profile_path": "/s9WIklN7aqPJMnun0oxoO4QFb3C.jpg"
        },
        {
          "id": 234907,
          "name": "Dar Salim",
          "credit_id": "5752158b9251414c470001c0",
          "character": "Qotho",
          "order": 56,
          "profile_path": "/3CrPTwZJ0hsWzX7oi7sKFfzDo82.jpg"
        },
        {
          "id": 58654,
          "name": "Owen Teale",
          "credit_id": "5752114a9251414c5400013c",
          "character": "Alliser Thorne",
          "order": 54,
          "profile_path": "/cUxG0sgqNJXuRAbOCKsAqFLyRDi.jpg"
        },
        {
          "id": 228969,
          "name": "Roxanne McKee",
          "credit_id": "57520a4ac3a368520c0000aa",
          "character": "Doreah",
          "order": 51,
          "profile_path": "/oJYawHvbZM48lNTGWKATapFzplL.jpg"
        },
        {
          "id": 1048692,
          "name": "Amrita Acharia",
          "credit_id": "5750d365925141087f0006e1",
          "character": "Irri",
          "order": 50,
          "profile_path": "/uwz4vjtIMxD9y7uq3CFpPjrznVR.jpg"
        },
        {
          "id": 43554,
          "name": "Josef Altin",
          "credit_id": "5750c9f6c3a3682fa0000129",
          "character": "Pypar",
          "order": 43,
          "profile_path": "/lnr6IQUAyXP0y1oj7sEZgmNpzpL.jpg"
        },
        {
          "id": 1345950,
          "name": "Mark Stanley",
          "credit_id": "5750c8009251412b79000045",
          "character": "Grenn",
          "order": 42,
          "profile_path": "/y6Z9tXUxNRay8MEo2ZQPtXQJ05m.jpg"
        },
        {
          "id": 193335,
          "name": "Dominic Carter",
          "credit_id": "556b676592514173e0003e18",
          "character": "Janos Slynt",
          "order": 10,
          "profile_path": "/8Wu34kgPhGI00XnQlt3OOmZepHL.jpg"
        },
        {
          "id": 117642,
          "name": "Jason Momoa",
          "credit_id": "5256c8a219c2956ff6046f40",
          "character": "Khal Drogo",
          "order": 0,
          "profile_path": "/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg"
        },
        {
          "id": 3300,
          "name": "Natalia Tena",
          "credit_id": "5256c8a519c2956ff6046ff6",
          "character": "",
          "order": 0,
          "profile_path": "/A5977qcPr05zAQSqr7nKKSbJhpY.jpg"
        }
      ],
      "name": "You Win or You Die",
      "overview": "Robert has been injured while hunting and is dying. Jon and the others finally take their vows to the Night's Watch. A man, sent by Robert, is captured for trying to poison Daenerys. Furious, Drogo vows to attack the Seven Kingdoms.",
      "id": 63062,
      "production_code": "107",
      "season_number": 1,
      "still_path": "/l0d3WVs99QZPoxrOGuk21mV5NSp.jpg",
      "vote_average": 8.125,
      "vote_count": 4
    },
    {
      "air_date": "2011-06-05",
      "crew": [
        {
          "id": 88743,
          "credit_id": "5256c8a519c2956ff60470ac",
          "name": "Daniel Minahan",
          "department": "Directing",
          "job": "Director",
          "profile_path": null
        },
        {
          "id": 94545,
          "credit_id": "54eef670c3a3686d5e005571",
          "name": "Matthew Jensen",
          "department": "Camera",
          "job": "Director of Photography",
          "profile_path": null
        },
        {
          "id": 81827,
          "credit_id": "54eef67cc3a3680b80006196",
          "name": "Martin Nicholson",
          "department": "Editing",
          "job": "Editor",
          "profile_path": null
        },
        {
          "id": 237053,
          "credit_id": "5256c8a619c2956ff60471bc",
          "name": "George R. R. Martin",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/v1fA3LZ4DefEPUvSFZmJVmczUmv.jpg"
        }
      ],
      "episode_number": 8,
      "guest_stars": [
        {
          "id": 1600546,
          "name": "Luke Barnes",
          "credit_id": "57521aa7c3a3685204000294",
          "character": "Rast",
          "order": 59,
          "profile_path": "/s9WIklN7aqPJMnun0oxoO4QFb3C.jpg"
        },
        {
          "id": 234907,
          "name": "Dar Salim",
          "credit_id": "5752158b9251414c470001c0",
          "character": "Qotho",
          "order": 56,
          "profile_path": "/3CrPTwZJ0hsWzX7oi7sKFfzDo82.jpg"
        },
        {
          "id": 58654,
          "name": "Owen Teale",
          "credit_id": "5752114a9251414c5400013c",
          "character": "Alliser Thorne",
          "order": 54,
          "profile_path": "/cUxG0sgqNJXuRAbOCKsAqFLyRDi.jpg"
        },
        {
          "id": 438859,
          "name": "Susan Brown",
          "credit_id": "57520bc19251414c470000de",
          "character": "Septa Mordane",
          "order": 52,
          "profile_path": "/5bYvoJDOw4okAzSxJ1avXweUyA9.jpg"
        },
        {
          "id": 228969,
          "name": "Roxanne McKee",
          "credit_id": "57520a4ac3a368520c0000aa",
          "character": "Doreah",
          "order": 51,
          "profile_path": "/oJYawHvbZM48lNTGWKATapFzplL.jpg"
        },
        {
          "id": 1048692,
          "name": "Amrita Acharia",
          "credit_id": "5750d365925141087f0006e1",
          "character": "Irri",
          "order": 50,
          "profile_path": "/uwz4vjtIMxD9y7uq3CFpPjrznVR.jpg"
        },
        {
          "id": 1399527,
          "name": "Miltos Yerolemou",
          "credit_id": "5750cf9a9251412b790002bb",
          "character": "Syrio Forel",
          "order": 47,
          "profile_path": "/iw0hivfHyuDLFPeLqWcbc9KNt7G.jpg"
        },
        {
          "id": 43554,
          "name": "Josef Altin",
          "credit_id": "5750c9f6c3a3682fa0000129",
          "character": "Pypar",
          "order": 43,
          "profile_path": "/lnr6IQUAyXP0y1oj7sEZgmNpzpL.jpg"
        },
        {
          "id": 1345950,
          "name": "Mark Stanley",
          "credit_id": "5750c8009251412b79000045",
          "character": "Grenn",
          "order": 42,
          "profile_path": "/y6Z9tXUxNRay8MEo2ZQPtXQJ05m.jpg"
        },
        {
          "id": 1403284,
          "name": "Ian Beattie",
          "credit_id": "5750c4e3c3a36801920002ac",
          "character": "Meryn Trant",
          "order": 41,
          "profile_path": "/aK2HzSykgu0bX2INEdgC6x0BKR3.jpg"
        },
        {
          "id": 193335,
          "name": "Dominic Carter",
          "credit_id": "556b676592514173e0003e18",
          "character": "Janos Slynt",
          "order": 10,
          "profile_path": "/8Wu34kgPhGI00XnQlt3OOmZepHL.jpg"
        },
        {
          "id": 117642,
          "name": "Jason Momoa",
          "credit_id": "5256c8a219c2956ff6046f40",
          "character": "Khal Drogo",
          "order": 0,
          "profile_path": "/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg"
        },
        {
          "id": 3300,
          "name": "Natalia Tena",
          "credit_id": "5256c8a519c2956ff6046ff6",
          "character": "",
          "order": 0,
          "profile_path": "/A5977qcPr05zAQSqr7nKKSbJhpY.jpg"
        }
      ],
      "name": "The Pointy End",
      "overview": "Eddard and his men are betrayed and captured by the Lannisters. When word reaches Robb, he plans to go to war to rescue them. The White Walkers attack The Wall. Tyrion returns to his father with some new friends.",
      "id": 63063,
      "production_code": "108",
      "season_number": 1,
      "still_path": "/9ZvT1IZPcC11eiCByOzqQvC3CCR.jpg",
      "vote_average": 7,
      "vote_count": 4
    },
    {
      "air_date": "2011-06-12",
      "crew": [
        {
          "id": 1318704,
          "credit_id": "54eef2429251417974005cb6",
          "name": "Alik Sakharov",
          "department": "Camera",
          "job": "Director of Photography",
          "profile_path": "/50ZlHkh66aOPxQMjQ21LJDAkYlR.jpg"
        },
        {
          "id": 47005,
          "credit_id": "5256c8a619c2956ff6047255",
          "name": "Alan Taylor",
          "department": "Directing",
          "job": "Director",
          "profile_path": "/f8hPlHuaRw1py22wp2qqNRfVDMw.jpg"
        },
        {
          "id": 1204180,
          "credit_id": "54eef453c3a3680b80006153",
          "name": "Frances Parker",
          "department": "Editing",
          "job": "Editor",
          "profile_path": null
        },
        {
          "id": 228068,
          "credit_id": "5256c8a219c2956ff6046e4b",
          "name": "D. B. Weiss",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
        },
        {
          "id": 9813,
          "credit_id": "5256c8a019c2956ff6046e2b",
          "name": "David Benioff",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
        }
      ],
      "episode_number": 9,
      "guest_stars": [
        {
          "id": 386,
          "name": "Peter Vaughan",
          "credit_id": "57617dd692514156c2000046",
          "character": "Maester Aemon",
          "order": 63,
          "profile_path": "/z9ZplbTA1ojYhgZ8kJUKKhsJ7Gs.jpg"
        },
        {
          "id": 1600546,
          "name": "Luke Barnes",
          "credit_id": "57521aa7c3a3685204000294",
          "character": "Rast",
          "order": 59,
          "profile_path": "/s9WIklN7aqPJMnun0oxoO4QFb3C.jpg"
        },
        {
          "id": 234907,
          "name": "Dar Salim",
          "credit_id": "5752158b9251414c470001c0",
          "character": "Qotho",
          "order": 56,
          "profile_path": "/3CrPTwZJ0hsWzX7oi7sKFfzDo82.jpg"
        },
        {
          "id": 228969,
          "name": "Roxanne McKee",
          "credit_id": "57520a4ac3a368520c0000aa",
          "character": "Doreah",
          "order": 51,
          "profile_path": "/oJYawHvbZM48lNTGWKATapFzplL.jpg"
        },
        {
          "id": 1048692,
          "name": "Amrita Acharia",
          "credit_id": "5750d365925141087f0006e1",
          "character": "Irri",
          "order": 50,
          "profile_path": "/uwz4vjtIMxD9y7uq3CFpPjrznVR.jpg"
        },
        {
          "id": 225870,
          "name": "Wilko Johnson",
          "credit_id": "5750d240c3a3682fa000041c",
          "character": "Ilyn Payne",
          "order": 49,
          "profile_path": "/ofncvvhuucP8ip3x8duQEzhJrsT.jpg"
        },
        {
          "id": 39661,
          "name": "Francis Magee",
          "credit_id": "5750d0ddc3a36818f1000489",
          "character": "Yoren",
          "order": 48,
          "profile_path": "/aHW0KktJ4u7MqeZ0ii11OkH3EIY.jpg"
        },
        {
          "id": 43554,
          "name": "Josef Altin",
          "credit_id": "5750c9f6c3a3682fa0000129",
          "character": "Pypar",
          "order": 43,
          "profile_path": "/lnr6IQUAyXP0y1oj7sEZgmNpzpL.jpg"
        },
        {
          "id": 1345950,
          "name": "Mark Stanley",
          "credit_id": "5750c8009251412b79000045",
          "character": "Grenn",
          "order": 42,
          "profile_path": "/y6Z9tXUxNRay8MEo2ZQPtXQJ05m.jpg"
        },
        {
          "id": 11180,
          "name": "David Bradley",
          "credit_id": "574e6088c3a3680134001206",
          "character": "Lord Walder Frey",
          "order": 36,
          "profile_path": "/5BPFRv4io7U1zxkYHtKaE9a8FDD.jpg"
        },
        {
          "id": 193335,
          "name": "Dominic Carter",
          "credit_id": "556b676592514173e0003e18",
          "character": "Janos Slynt",
          "order": 10,
          "profile_path": "/8Wu34kgPhGI00XnQlt3OOmZepHL.jpg"
        },
        {
          "id": 740,
          "name": "Julian Glover",
          "credit_id": "5256c8a519c2956ff6047046",
          "character": "",
          "order": 1,
          "profile_path": "/2sQWrB4of8O2k7DGwJ3OdGJi2Mj.jpg"
        },
        {
          "id": 117642,
          "name": "Jason Momoa",
          "credit_id": "5256c8a219c2956ff6046f40",
          "character": "Khal Drogo",
          "order": 0,
          "profile_path": "/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg"
        }
      ],
      "name": "Baelor",
      "overview": "Robb goes to war against the Lannisters. Jon finds himself struggling on deciding if his place is with Robb or the Night's Watch. Drogo has fallen ill from a fresh battle wound. Daenerys is desperate to save him.",
      "id": 63064,
      "production_code": "109",
      "season_number": 1,
      "still_path": "/41zQhAxoccalbhcd1udPIPJVTt1.jpg",
      "vote_average": 8.1,
      "vote_count": 5
    },
    {
      "air_date": "2011-06-19",
      "crew": [
        {
          "id": 1318704,
          "credit_id": "54eef2429251417974005cb6",
          "name": "Alik Sakharov",
          "department": "Camera",
          "job": "Director of Photography",
          "profile_path": "/50ZlHkh66aOPxQMjQ21LJDAkYlR.jpg"
        },
        {
          "id": 47005,
          "credit_id": "5256c8a619c2956ff6047255",
          "name": "Alan Taylor",
          "department": "Directing",
          "job": "Director",
          "profile_path": "/f8hPlHuaRw1py22wp2qqNRfVDMw.jpg"
        },
        {
          "id": 1204180,
          "credit_id": "54eef453c3a3680b80006153",
          "name": "Frances Parker",
          "department": "Editing",
          "job": "Editor",
          "profile_path": null
        },
        {
          "id": 228068,
          "credit_id": "5256c8a219c2956ff6046e4b",
          "name": "D. B. Weiss",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/caUAtilEe06OwOjoQY3B7BgpARi.jpg"
        },
        {
          "id": 9813,
          "credit_id": "5256c8a019c2956ff6046e2b",
          "name": "David Benioff",
          "department": "Writing",
          "job": "Writer",
          "profile_path": "/8CuuNIKMzMUL1NKOPv9AqEwM7og.jpg"
        }
      ],
      "episode_number": 10,
      "guest_stars": [
        {
          "id": 1600547,
          "name": "Ben Hawkey",
          "credit_id": "575217419251414c570001cd",
          "character": "Hot Pie",
          "order": 58,
          "profile_path": "/qiK3Aa5UQxh9H6ul8rdD1Io9xxA.jpg"
        },
        {
          "id": 438859,
          "name": "Susan Brown",
          "credit_id": "57520bc19251414c470000de",
          "character": "Septa Mordane",
          "order": 52,
          "profile_path": "/5bYvoJDOw4okAzSxJ1avXweUyA9.jpg"
        },
        {
          "id": 1048692,
          "name": "Amrita Acharia",
          "credit_id": "5750d365925141087f0006e1",
          "character": "Irri",
          "order": 50,
          "profile_path": "/uwz4vjtIMxD9y7uq3CFpPjrznVR.jpg"
        },
        {
          "id": 225870,
          "name": "Wilko Johnson",
          "credit_id": "5750d240c3a3682fa000041c",
          "character": "Ilyn Payne",
          "order": 49,
          "profile_path": "/ofncvvhuucP8ip3x8duQEzhJrsT.jpg"
        },
        {
          "id": 39661,
          "name": "Francis Magee",
          "credit_id": "5750d0ddc3a36818f1000489",
          "character": "Yoren",
          "order": 48,
          "profile_path": "/aHW0KktJ4u7MqeZ0ii11OkH3EIY.jpg"
        },
        {
          "id": 43554,
          "name": "Josef Altin",
          "credit_id": "5750c9f6c3a3682fa0000129",
          "character": "Pypar",
          "order": 43,
          "profile_path": "/lnr6IQUAyXP0y1oj7sEZgmNpzpL.jpg"
        },
        {
          "id": 1345950,
          "name": "Mark Stanley",
          "credit_id": "5750c8009251412b79000045",
          "character": "Grenn",
          "order": 42,
          "profile_path": "/y6Z9tXUxNRay8MEo2ZQPtXQJ05m.jpg"
        },
        {
          "id": 1403284,
          "name": "Ian Beattie",
          "credit_id": "5750c4e3c3a36801920002ac",
          "character": "Meryn Trant",
          "order": 41,
          "profile_path": "/aK2HzSykgu0bX2INEdgC6x0BKR3.jpg"
        },
        {
          "id": 5118,
          "name": "Sibel Kekilli",
          "credit_id": "5256c8b919c2956ff6048330",
          "character": "Shae",
          "order": 16,
          "profile_path": "/4E0wtNJ2WiBtvHXur0uursQ7HLl.jpg"
        },
        {
          "id": 117642,
          "name": "Jason Momoa",
          "credit_id": "5256c8a219c2956ff6046f40",
          "character": "Khal Drogo",
          "order": 0,
          "profile_path": "/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg"
        },
        {
          "id": 3300,
          "name": "Natalia Tena",
          "credit_id": "5256c8a519c2956ff6046ff6",
          "character": "",
          "order": 0,
          "profile_path": "/A5977qcPr05zAQSqr7nKKSbJhpY.jpg"
        }
      ],
      "name": "Fire and Blood",
      "overview": "With Ned dead, Robb vows to get revenge on the Lannisters. Jon must officially decide if his place is with Robb or the Night's Watch. Daenerys says her final goodbye to Drogo.",
      "id": 63065,
      "production_code": "110",
      "season_number": 1,
      "still_path": "/88loh1qyi8vwJO8qH1SdQRsHKNI.jpg",
      "vote_average": 8.08333333333333,
      "vote_count": 6
    }
  ],
  "name": "Season 1",
  "overview": "Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.",
  "id": 3624,
  "poster_path": "/olJ6ivXxCMq3cfujo1IRw30OrsQ.jpg",
  "season_number": 1
}
 */

/*  Export function Example
export function GetHistoricWeather_Query(qry: String, date: Date, 
	callback: ((weather,s) => void), error: ((jqXHR, exception) => void) = null) 
{
	let dt = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("history")}&dt=${dt}&q=${qry}`,
		data: {},
		success: ((weather, s) => {
			let responseWeather = null;

			if (s == "success") {
				console.log(weather);
				if (weather.forecast.forecastday.length != 0) {
					// console.log("GetHistoricWeather_Query: weather.forecast.forecastday.length != 0", {location: weather.location, 
					// 	current: weather.forecast.forecastday[0].hour[date.getUTCHours()]});

					responseWeather = JSON.parse(JSON.stringify({
						location: weather.location, 
						current: weather.forecast.forecastday[0].hour[date.getUTCHours()],
						api_response: weather,
						wanted_date: dt,
						wanted_hour: {
							local: date.getHours(),
							utc: date.getUTCHours()
						}
					}));
				} else {
					s = "nocontent";
				}
			}
			
			callback(responseWeather, s);
		}),
		error: error,
		dataType: 'json',
	});
}
*/

export function GetPopular(callback: ((tvseriesList: SeriesList.RootObject, s) => void), error: ((jqXHR, exception) => void) = null) {
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("tv/popular?", "")}`,
		data: {},
		success: callback,
		error: error,
		dataType: 'json',
	});
}

export function GetTopRated(callback: ((tvseriesList: SeriesList.RootObject, s) => void), error: ((jqXHR, exception) => void) = null) {
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("tv/top_rated?", "")}`,
		data: {},
		success: callback,
		error: error,
		dataType: 'json',
	});
}

export function GetTVID(showID: number, callback: ((tvInformation: TVID.RootObject, s) => void), error: ((jqXHR, exception) => void) = null) {
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("tv/" + showID + "?", "")}`,
		data: {},
		success: callback,
		error: error,
		dataType: 'json',
	});
}

export function GetTVID_Season(showID: number, season: number, callback: ((tvSeason: TVID_Season.RootObject, s) => void), error: ((jqXHR, exception) => void) = null) {
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("tv/" + showID + "/season/" + season + "?", "")}`,
		data: {},
		async: false,
		success: callback,
		error: error,
		dataType: 'json',
	});
}

// https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&query=hiiiiiiiiii&page=1

export function QueryTV(query: string, callback: ((tvResults: SeriesList.RootObject, s) => void), error: ((jqXHR, exception) => void) = null) {
	$.ajax({
		type: "GET",
		url: `${getAPIEndpoint("search/tv?", "&query=" + query)}`,
		data: {},
		success: callback,
		error: error,
		dataType: 'json',
	});
}
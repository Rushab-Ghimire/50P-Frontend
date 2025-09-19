import { GOOGLE_MAP_API_KEY } from "@app/_utilities/constants/paths-env";
import { GLOBAL } from "@app/_utilities/globals";
import { useArrayState } from "@app/_utilities/helpers";
import { Colors } from "@app/modules/AskDaysi/theme/colors";
import { Span } from "@jumbo/shared";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingAnimation from "../../../components/LoadingAnimation";

var data = {
  kind: "customsearch#search",
  url: {
    type: "application/json",
    template:
      "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json",
  },
  queries: {
    request: [
      {
        title: "Google Custom Search - lectures",
        totalResults: "18600000",
        searchTerms: "lectures",
        count: 10,
        startIndex: 1,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "07b1276b6509640f6",
      },
    ],
    nextPage: [
      {
        title: "Google Custom Search - lectures",
        totalResults: "18600000",
        searchTerms: "lectures",
        count: 10,
        startIndex: 11,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "07b1276b6509640f6",
      },
    ],
  },
  context: {
    title: "AskDaysi Community",
  },
  searchInformation: {
    searchTime: 0.482795,
    formattedSearchTime: "0.48",
    totalResults: "18600000",
    formattedTotalResults: "18,600,000",
  },
  items: [
    {
      kind: "customsearch#result",
      title: "Video Lectures",
      htmlTitle: "Video \u003cb\u003eLectures\u003c/b\u003e",
      link: "https://www.reddit.com/r/lectures/",
      displayLink: "www.reddit.com",
      snippet:
        "Jun 1, 2008 ... Exploring the boundaries of AI: sentience, self awareness, and the possibility of machine consciousness.",
      htmlSnippet:
        "Jun 1, 2008 \u003cb\u003e...\u003c/b\u003e Exploring the boundaries of AI: sentience, self awareness, and the possibility of machine consciousness.",
      formattedUrl: "https://www.reddit.com/r/lectures/",
      htmlFormattedUrl:
        "https://www.reddit.com/r/\u003cb\u003electures\u003c/b\u003e/",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZtOjhfkgUKQbL3DZxe5F6OVsgeDNffleObjJ7n9RllKQTSsimax7VIaY&s",
            width: "192",
            height: "192",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://www.redditstatic.com/shreddit/assets/favicon/192x192.png",
            "theme-color": "#000000",
            "og:image:width": "256",
            "og:type": "website",
            "twitter:card": "summary",
            "twitter:title": "r/lectures",
            "og:site_name": "Reddit",
            "og:title": "r/lectures",
            "og:image:height": "256",
            bingbot: "noarchive",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "This subreddit is all about video lectures, talks and interesting public speeches.\n\nThe topics include mathematics, physics, computer science, programming, engineering, biology, medicine, economics, politics, social sciences, and any other subjects!",
            "twitter:image":
              "https://www.redditstatic.com/shreddit/assets/favicon/192x192.png",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url": "https://www.reddit.com/r/lectures/",
          },
        ],
        cse_image: [
          {
            src: "https://www.redditstatic.com/shreddit/assets/favicon/192x192.png",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Should I get The Feynman Lectures on Physics, boxed set? : r ...",
      htmlTitle:
        "Should I get The Feynman \u003cb\u003eLectures\u003c/b\u003e on Physics, boxed set? : r ...",
      link: "https://www.reddit.com/r/AskPhysics/comments/peijdv/should_i_get_the_feynman_lectures_on_physics/",
      displayLink: "www.reddit.com",
      snippet:
        "Aug 30, 2021 ... I've searched around for a good general physics book and have read alot of good things about the feynman's lectures books and its accompanying exercise book.",
      htmlSnippet:
        "Aug 30, 2021 \u003cb\u003e...\u003c/b\u003e I&#39;ve searched around for a good general physics book and have read alot of good things about the feynman&#39;s \u003cb\u003electures\u003c/b\u003e books and its accompanying exercise book.",
      formattedUrl:
        "https://www.reddit.com/r/.../should_i_get_the_feynman_lectures_on_physi...",
      htmlFormattedUrl:
        "https://www.reddit.com/r/.../should_i_get_the_feynman_\u003cb\u003electures\u003c/b\u003e_on_physi...",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/peijdv",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/AskPhysics on Reddit: Should I get The Feynman Lectures on Physics, boxed set?",
            "og:site_name": "Reddit",
            "og:title":
              "r/AskPhysics on Reddit: Should I get The Feynman Lectures on Physics, boxed set?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/swedish-seeker - 1 vote and 8 comments",
            "twitter:image": "https://share.redd.it/preview/post/peijdv",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/AskPhysics/comments/peijdv/should_i_get_the_feynman_lectures_on_physics/",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Are the Feynman Lectures still relevant? : r/askscience",
      htmlTitle:
        "Are the Feynman \u003cb\u003eLectures\u003c/b\u003e still relevant? : r/askscience",
      link: "https://www.reddit.com/r/askscience/comments/lj49g/are_the_feynman_lectures_still_relevant/",
      displayLink: "www.reddit.com",
      snippet:
        "Oct 20, 2011 ... The Feynman lectures were a 1st year physics course for all students, meaning they covered pretty much everything from the inception of physics to quantum.",
      htmlSnippet:
        "Oct 20, 2011 \u003cb\u003e...\u003c/b\u003e The Feynman \u003cb\u003electures\u003c/b\u003e were a 1st year physics course for all students, meaning they covered pretty much everything from the inception of physics to quantum.",
      formattedUrl:
        "https://www.reddit.com/r/.../lj49g/are_the_feynman_lectures_still_relevant/",
      htmlFormattedUrl:
        "https://www.reddit.com/r/.../lj49g/are_the_feynman_\u003cb\u003electures\u003c/b\u003e_still_relevant/",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/lj49g",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/askscience on Reddit: Are the Feynman Lectures still relevant?",
            "og:site_name": "Reddit",
            "og:title":
              "r/askscience on Reddit: Are the Feynman Lectures still relevant?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/smccorm007 - 9 votes and 12 comments",
            "twitter:image": "https://share.redd.it/preview/post/lj49g",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/askscience/comments/lj49g/are_the_feynman_lectures_still_relevant/",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "Can you guys recommend free lectures from well known colleges ...",
      htmlTitle:
        "Can you guys recommend free \u003cb\u003electures\u003c/b\u003e from well known colleges ...",
      link: "https://www.reddit.com/r/askphilosophy/comments/n1juzr/can_you_guys_recommend_free_lectures_from_well/",
      displayLink: "www.reddit.com",
      snippet:
        "Apr 30, 2021 ... I would like to learn from video lectures as much context for the famous philosophers and then learn about their ideas as I feel its much easier for me to ...",
      htmlSnippet:
        "Apr 30, 2021 \u003cb\u003e...\u003c/b\u003e I would like to learn from video \u003cb\u003electures\u003c/b\u003e as much context for the famous philosophers and then learn about their ideas as I feel its much easier for me to&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/.../can_you_guys_recommend_free_lectures_from...",
      htmlFormattedUrl:
        "https://www.reddit.com/.../can_you_guys_recommend_free_\u003cb\u003electures\u003c/b\u003e_from...",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/n1juzr",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/askphilosophy on Reddit: Can you guys recommend free lectures from well known colleges about the most influential philosophers? Such as coruses or specfic lectures about Plato or Kant.",
            "og:site_name": "Reddit",
            "og:title":
              "r/askphilosophy on Reddit: Can you guys recommend free lectures from well known colleges about the most influential philosophers? Such as coruses or specfic lectures about Plato or Kant.",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/Joeman720 - 175 votes and 32 comments",
            "twitter:image": "https://share.redd.it/preview/post/n1juzr",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/askphilosophy/comments/n1juzr/can_you_guys_recommend_free_lectures_from_well/",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Are Feynman lectures good for High School? : r/AskPhysics",
      htmlTitle:
        "Are Feynman \u003cb\u003electures\u003c/b\u003e good for High School? : r/AskPhysics",
      link: "https://www.reddit.com/r/AskPhysics/comments/1f79v4n/are_feynman_lectures_good_for_high_school/",
      displayLink: "www.reddit.com",
      snippet:
        "Sep 2, 2024 ... The Feynman Lectures are great for someone who already knows the material, for a fresh perspective. Definitely not the best choice for a high ...",
      htmlSnippet:
        "Sep 2, 2024 \u003cb\u003e...\u003c/b\u003e The Feynman \u003cb\u003eLectures\u003c/b\u003e are great for someone who already knows the material, for a fresh perspective. Definitely not the best choice for a high&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/r/.../are_feynman_lectures_good_for_high_school/",
      htmlFormattedUrl:
        "https://www.reddit.com/r/.../are_feynman_\u003cb\u003electures\u003c/b\u003e_good_for_high_school/",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/1f79v4n",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/AskPhysics on Reddit: Are Feynman lectures good for High School?",
            "og:site_name": "Reddit",
            "og:title":
              "r/AskPhysics on Reddit: Are Feynman lectures good for High School?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/legoPuzzle - 13 votes and 15 comments",
            "twitter:image": "https://share.redd.it/preview/post/1f79v4n",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/AskPhysics/comments/1f79v4n/are_feynman_lectures_good_for_high_school/",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Are Feynman lectures on Physics outdated? : r/Physics",
      htmlTitle:
        "Are Feynman \u003cb\u003electures\u003c/b\u003e on Physics outdated? : r/Physics",
      link: "https://www.reddit.com/r/Physics/comments/4xf9sl/are_feynman_lectures_on_physics_outdated/",
      displayLink: "www.reddit.com",
      snippet:
        'Aug 12, 2016 ... I was thinking about starting with the "Feynman lectures on Physics" since are well explained and take a very fundamental approach, but these are a bunch of ...',
      htmlSnippet:
        "Aug 12, 2016 \u003cb\u003e...\u003c/b\u003e I was thinking about starting with the &quot;Feynman \u003cb\u003electures\u003c/b\u003e on Physics&quot; since are well explained and take a very fundamental approach, but these are a bunch of&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/r/.../are_feynman_lectures_on_physics_outdated/",
      htmlFormattedUrl:
        "https://www.reddit.com/r/.../are_feynman_\u003cb\u003electures\u003c/b\u003e_on_physics_outdated/",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/4xf9sl",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/Physics on Reddit: Are Feynman lectures on Physics outdated?",
            "og:site_name": "Reddit",
            "og:title":
              "r/Physics on Reddit: Are Feynman lectures on Physics outdated?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/saito200 - 137 votes and 39 comments",
            "twitter:image": "https://share.redd.it/preview/post/4xf9sl",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/Physics/comments/4xf9sl/are_feynman_lectures_on_physics_outdated/",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "What's the point of (physics) lectures? : r/Physics",
      htmlTitle:
        "What&#39;s the point of (physics) \u003cb\u003electures\u003c/b\u003e? : r/Physics",
      link: "https://www.reddit.com/r/Physics/comments/1c5j31b/whats_the_point_of_physics_lectures/",
      displayLink: "www.reddit.com",
      snippet:
        "Apr 16, 2024 ... Lectures should be informative by deriving the concepts, motivating the derivation, fully displaying the definition, and showing exercises that can be used to ...",
      htmlSnippet:
        "Apr 16, 2024 \u003cb\u003e...\u003c/b\u003e \u003cb\u003eLectures\u003c/b\u003e should be informative by deriving the concepts, motivating the derivation, fully displaying the definition, and showing exercises that can be used to&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/r/Physics/.../whats_the_point_of_physics_lectures/",
      htmlFormattedUrl:
        "https://www.reddit.com/r/Physics/.../whats_the_point_of_physics_\u003cb\u003electures\u003c/b\u003e/",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/1c5j31b",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/Physics on Reddit: What’s the point of (physics) lectures?",
            "og:site_name": "Reddit",
            "og:title":
              "r/Physics on Reddit: What’s the point of (physics) lectures?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/Hellstorme - 61 votes and 61 comments",
            "twitter:image": "https://share.redd.it/preview/post/1c5j31b",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/Physics/comments/1c5j31b/whats_the_point_of_physics_lectures/",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "What is no longer “relevant” from the Feynman lectures? : r/AskPhysics",
      htmlTitle:
        "What is no longer “relevant” from the Feynman \u003cb\u003electures\u003c/b\u003e? : r/AskPhysics",
      link: "https://www.reddit.com/r/AskPhysics/comments/1dufrny/what_is_no_longer_relevant_from_the_feynman/",
      displayLink: "www.reddit.com",
      snippet:
        "Jul 3, 2024 ... I'm planning to read The Feynman Lectures for Physics over the summer to help me bridge the gap from A levels. Because it's a bit dated, I've heard there's ...",
      htmlSnippet:
        "Jul 3, 2024 \u003cb\u003e...\u003c/b\u003e I&#39;m planning to read The Feynman \u003cb\u003eLectures\u003c/b\u003e for Physics over the summer to help me bridge the gap from A levels. Because it&#39;s a bit dated, I&#39;ve heard there&#39;s&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/.../what_is_no_longer_relevant_from_the_feynman...",
      htmlFormattedUrl:
        "https://www.reddit.com/.../what_is_no_longer_relevant_from_the_feynman...",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6PGoRBD3D1-huCDq-0tnHiVvE8OBntevWyofwBEfO8u0kwnazxSZt3Lo&s",
            width: "225",
            height: "225",
          },
        ],
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/1dufrny",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/AskPhysics on Reddit: What is no longer “relevant” from the Feynman lectures?",
            "og:site_name": "Reddit",
            "og:title":
              "r/AskPhysics on Reddit: What is no longer “relevant” from the Feynman lectures?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/SpaceWizard360 - 4 votes and 23 comments",
            "twitter:image": "https://share.redd.it/preview/post/1dufrny",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/AskPhysics/comments/1dufrny/what_is_no_longer_relevant_from_the_feynman/",
          },
        ],
        cse_image: [
          {
            src: "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_6.png",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Skipping lectures all together ? : r/barexam",
      htmlTitle:
        "Skipping \u003cb\u003electures\u003c/b\u003e all together ? : r/barexam",
      link: "https://www.reddit.com/r/barexam/comments/18j2mb7/skipping_lectures_all_together/",
      displayLink: "www.reddit.com",
      snippet:
        "Dec 15, 2023 ... The number one rule of bar prep is do what works for you. If you sincerely feel you are getting nothing out of the lectures, then I say use your time in the ...",
      htmlSnippet:
        "Dec 15, 2023 \u003cb\u003e...\u003c/b\u003e The number one rule of bar prep is do what works for you. If you sincerely feel you are getting nothing out of the \u003cb\u003electures\u003c/b\u003e, then I say use your time in the&nbsp;...",
      formattedUrl:
        "https://www.reddit.com/r/barexam/.../skipping_lectures_all_together/",
      htmlFormattedUrl:
        "https://www.reddit.com/r/barexam/.../skipping_\u003cb\u003electures\u003c/b\u003e_all_together/",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/18j2mb7",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title":
              "r/barexam on Reddit: Skipping lectures all together ?",
            "og:site_name": "Reddit",
            "og:title": "r/barexam on Reddit: Skipping lectures all together ?",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description": "Posted by u/Jeanpj - 11 votes and 26 comments",
            "twitter:image": "https://share.redd.it/preview/post/18j2mb7",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/barexam/comments/18j2mb7/skipping_lectures_all_together/",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Lectures : r/SNHU",
      htmlTitle: "\u003cb\u003eLectures\u003c/b\u003e : r/SNHU",
      link: "https://www.reddit.com/r/SNHU/comments/14pjscc/lectures/",
      displayLink: "www.reddit.com",
      snippet:
        "Jul 3, 2023 ... I feel like for SNHU we basically teach ourselves and just have a professor/instructor there in the background for feedback and/or questions and ...",
      htmlSnippet:
        "Jul 3, 2023 \u003cb\u003e...\u003c/b\u003e I feel like for SNHU we basically teach ourselves and just have a professor/instructor there in the background for feedback and/or questions and&nbsp;...",
      formattedUrl: "https://www.reddit.com/r/SNHU/comments/14pjscc/lectures/",
      htmlFormattedUrl:
        "https://www.reddit.com/r/SNHU/comments/14pjscc/\u003cb\u003electures\u003c/b\u003e/",
      pagemap: {
        metatags: [
          {
            "og:image": "https://share.redd.it/preview/post/14pjscc",
            "theme-color": "#000000",
            "og:image:width": "1200",
            "og:type": "website",
            "og:image:alt": "An image containing a preview of the post",
            "twitter:card": "summary_large_image",
            "twitter:title": "r/SNHU on Reddit: Lectures",
            "og:site_name": "Reddit",
            "og:title": "r/SNHU on Reddit: Lectures",
            "og:image:height": "630",
            "msapplication-navbutton-color": "#000000",
            "og:description":
              "Posted by u/WhiteLaundryBasket94 - 2 votes and 13 comments",
            "twitter:image": "https://share.redd.it/preview/post/14pjscc",
            "apple-mobile-web-app-status-bar-style": "black",
            "twitter:site": "@reddit",
            viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
            "apple-mobile-web-app-capable": "yes",
            "og:ttl": "600",
            "og:url":
              "https://www.reddit.com/r/SNHU/comments/14pjscc/lectures/",
          },
        ],
      },
    },
  ],
};

const GoogleSearch = ({ q = "" }) => {
  const [list, setList] = useArrayState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q == "") return;
    setLoading(true);
    var urlx = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_MAP_API_KEY}&cx=07b1276b6509640f6&q=${q}`;

    fetch(`${urlx}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json()) // or, resp.text(), etc
      .then((r) => {
        setLoading(false);
        r.items.map((itm) => {
          setList((p) =>
            p.push({
              title: itm.htmlTitle,
              snippet: itm.snippet,
              link: itm.link,
              formattedUrl: itm.formattedUrl,
              image:
                itm.pagemap?.cse_thumbnail !== undefined
                  ? itm.pagemap?.cse_thumbnail[0].src
                  : undefined,
            })
          );
        });

        console.log("list", list);
      })
      .catch((error) => {
        console.error("error", error);
      });

    // data.items.map((itm) => {
    //   setList((p) =>
    //     p.push({
    //       title: itm.htmlTitle,
    //       snippet: itm.snippet,
    //       link: itm.link,
    //       formattedUrl: itm.formattedUrl,
    //       image:
    //         itm.pagemap?.cse_thumbnail !== undefined
    //           ? itm.pagemap?.cse_thumbnail[0].src
    //           : undefined,
    //     })
    //   );
    // });

    // console.log("list", list);
  }, []);

  return (
    <>
      {loading && (
        <LoadingAnimation searchText="Searching" sx={{ paddingTop: "10px" }} />
      )}
      {list.map((i) => (
        <Box key={uuid()} className="g-search-block">
          <Box>
            <Link
              to={i.link}
              target="_BLANK"
              style={{ wordBreak: "break-all" }}
            >
              {i.formattedUrl}
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              mt: 1,
              gap: i.image ? 2 : 0,
            }}
          >
            <Stack>
              {i.image !== undefined && <img width={100} src={i.image} />}
            </Stack>
            <Stack>
              <Span
                dangerouslySetInnerHTML={{
                  __html: i.title,
                }}
                sx={{
                  fontSize: "20px",
                  color: Colors.gray_1,
                  // fontWeight: "500",
                }}
              />
              <Typography variant="body" paragraph sx={{ fontSize: "15px" }}>
                {i.snippet}
              </Typography>
            </Stack>
          </Box>
          <hr />
        </Box>
      ))}
    </>
  );
};

export default GoogleSearch;

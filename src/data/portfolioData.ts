/**
 * ============================================================================
 * NAYAB REHAN — CENTRALIZED PORTFOLIO DATA (CLAYMORPHIC)
 * Clean, curated commercial collection data (29 looks).
 * ============================================================================
 */

export interface DesignerProfile {
  name: string;
  monogram: string;
  title: string;
  tagline: string;
  statement: string;
  bio: string;
  whatsappNumber: string;
  formattedPhone: string;
  email: string;
  linkedinUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  studioLocation: string;
}

export interface CollectionLook {
  id: string;
  lookNumber: string;
  title: string;
  imageUrl: string;
  aspectRatio: string;
}

export interface CollectionArchive {
  id: string;
  pageLabel: string;
  archiveNumber: string;
  title: string;
  coverImage: string;
  looks: CollectionLook[];
}

export const designerData: DesignerProfile = {
  name: "Nayaab Rehan",
  monogram: "NR",
  title: "Textile & Lawn Print Designer",
  tagline: "Lawn Collections, Textile Prints & Brand Portfolio.",
  statement: "Designing modern lawn collections with refined botanical digital prints, balanced color palettes, and commercial brand appeal.",
  bio: "Nayaab Rehan is a fashion and textile designer based in Lahore, Pakistan, specializing in commercial lawn collections, digital print development, and apparel design for fashion brands and textile houses.",
  whatsappNumber: "923257409278",
  formattedPhone: "0325 7409278",
  email: "nayaabrehan655@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/nayaab-rehan-50b823281?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  instagramHandle: "",
  instagramUrl: "",
  studioLocation: "Lahore, Pakistan",
};

export const collectionsData: CollectionArchive[] = [
  {
    "id": "page-01",
    "pageLabel": "Page 1",
    "archiveNumber": "PAGE 01",
    "title": "Collection Archive — Vol. 01",
    "coverImage": "/images/designs/design-01.jpeg",
    "looks": [
      {
        "id": "look-01",
        "lookNumber": "LOOK 01",
        "title": "Design 01",
        "imageUrl": "/images/designs/design-01.jpeg",
        "aspectRatio": "540 / 1109"
      },
      {
        "id": "look-02",
        "lookNumber": "LOOK 02",
        "title": "Design 02",
        "imageUrl": "/images/designs/design-02.jpeg",
        "aspectRatio": "540 / 1107"
      },
      {
        "id": "look-03",
        "lookNumber": "LOOK 03",
        "title": "Design 03",
        "imageUrl": "/images/designs/design-03.jpeg",
        "aspectRatio": "540 / 765"
      },
      {
        "id": "look-04",
        "lookNumber": "LOOK 04",
        "title": "Design 04",
        "imageUrl": "/images/designs/design-04.jpeg",
        "aspectRatio": "463 / 583"
      },
      {
        "id": "look-05",
        "lookNumber": "LOOK 05",
        "title": "Design 05",
        "imageUrl": "/images/designs/design-05.jpeg",
        "aspectRatio": "284 / 795"
      },
      {
        "id": "look-06",
        "lookNumber": "LOOK 06",
        "title": "Design 06",
        "imageUrl": "/images/designs/design-06.jpeg",
        "aspectRatio": "960 / 1282"
      },
      {
        "id": "look-07",
        "lookNumber": "LOOK 07",
        "title": "Design 07",
        "imageUrl": "/images/designs/design-07.jpeg",
        "aspectRatio": "960 / 1282"
      },
      {
        "id": "look-08",
        "lookNumber": "LOOK 08",
        "title": "Design 08",
        "imageUrl": "/images/designs/design-08.jpeg",
        "aspectRatio": "960 / 1282"
      }
    ]
  },
  {
    "id": "page-02",
    "pageLabel": "Page 2",
    "archiveNumber": "PAGE 02",
    "title": "Collection Archive — Vol. 02",
    "coverImage": "/images/designs/design-09.jpeg",
    "looks": [
      {
        "id": "look-09",
        "lookNumber": "LOOK 09",
        "title": "Design 09",
        "imageUrl": "/images/designs/design-09.jpeg",
        "aspectRatio": "960 / 1282"
      },
      {
        "id": "look-10",
        "lookNumber": "LOOK 10",
        "title": "Design 10",
        "imageUrl": "/images/designs/design-10.jpeg",
        "aspectRatio": "960 / 1282"
      },
      {
        "id": "look-11",
        "lookNumber": "LOOK 11",
        "title": "Design 11",
        "imageUrl": "/images/designs/design-11.jpeg",
        "aspectRatio": "960 / 1282"
      },
      {
        "id": "look-12",
        "lookNumber": "LOOK 12",
        "title": "Design 12",
        "imageUrl": "/images/designs/design-12.jpeg",
        "aspectRatio": "960 / 1282"
      },
      {
        "id": "look-13",
        "lookNumber": "LOOK 13",
        "title": "Design 13",
        "imageUrl": "/images/designs/design-13.jpeg",
        "aspectRatio": "960 / 1282"
      },
      {
        "id": "look-14",
        "lookNumber": "LOOK 14",
        "title": "Design 14",
        "imageUrl": "/images/designs/design-14.jpeg",
        "aspectRatio": "960 / 1282"
      },
      {
        "id": "look-15",
        "lookNumber": "LOOK 15",
        "title": "Design 15",
        "imageUrl": "/images/designs/design-15.jpeg",
        "aspectRatio": "960 / 1282"
      },
      {
        "id": "look-16",
        "lookNumber": "LOOK 16",
        "title": "Design 16",
        "imageUrl": "/images/designs/design-16.jpeg",
        "aspectRatio": "1280 / 842"
      }
    ]
  },
  {
    "id": "page-03",
    "pageLabel": "Page 3",
    "archiveNumber": "PAGE 03",
    "title": "Collection Archive — Vol. 03",
    "coverImage": "/images/designs/design-17.jpeg",
    "looks": [
      {
        "id": "look-17",
        "lookNumber": "LOOK 17",
        "title": "Design 17",
        "imageUrl": "/images/designs/design-17.jpeg",
        "aspectRatio": "1280 / 842"
      },
      {
        "id": "look-18",
        "lookNumber": "LOOK 18",
        "title": "Design 18",
        "imageUrl": "/images/designs/design-18.jpeg",
        "aspectRatio": "540 / 1068"
      },
      {
        "id": "look-19",
        "lookNumber": "LOOK 19",
        "title": "Design 19",
        "imageUrl": "/images/designs/design-19.jpeg",
        "aspectRatio": "540 / 934"
      },
      {
        "id": "look-20",
        "lookNumber": "LOOK 20",
        "title": "Design 20",
        "imageUrl": "/images/designs/design-20.jpeg",
        "aspectRatio": "698 / 1280"
      },
      {
        "id": "look-21",
        "lookNumber": "LOOK 21",
        "title": "Design 21",
        "imageUrl": "/images/designs/design-21.jpeg",
        "aspectRatio": "1080 / 912"
      },
      {
        "id": "look-22",
        "lookNumber": "LOOK 22",
        "title": "Design 22",
        "imageUrl": "/images/designs/design-22.jpeg",
        "aspectRatio": "540 / 714"
      },
      {
        "id": "look-23",
        "lookNumber": "LOOK 23",
        "title": "Design 23",
        "imageUrl": "/images/designs/design-23.jpeg",
        "aspectRatio": "540 / 664"
      },
      {
        "id": "look-24",
        "lookNumber": "LOOK 24",
        "title": "Design 24",
        "imageUrl": "/images/designs/design-24.jpeg",
        "aspectRatio": "540 / 880"
      }
    ]
  },
  {
    "id": "page-04",
    "pageLabel": "Page 4",
    "archiveNumber": "PAGE 04",
    "title": "Collection Archive — Vol. 04",
    "coverImage": "/images/designs/design-25.jpeg",
    "looks": [
      {
        "id": "look-25",
        "lookNumber": "LOOK 25",
        "title": "Design 25",
        "imageUrl": "/images/designs/design-25.jpeg",
        "aspectRatio": "576 / 900"
      },
      {
        "id": "look-26",
        "lookNumber": "LOOK 26",
        "title": "Design 26",
        "imageUrl": "/images/designs/design-26.jpeg",
        "aspectRatio": "1080 / 1084"
      },
      {
        "id": "look-27",
        "lookNumber": "LOOK 27",
        "title": "Design 27",
        "imageUrl": "/images/designs/design-27.jpeg",
        "aspectRatio": "915 / 1280"
      },
      {
        "id": "look-28",
        "lookNumber": "LOOK 28",
        "title": "Design 28",
        "imageUrl": "/images/designs/design-28.jpeg",
        "aspectRatio": "982 / 1280"
      },
      {
        "id": "look-29",
        "lookNumber": "LOOK 29",
        "title": "Design 29",
        "imageUrl": "/images/designs/design-29.jpeg",
        "aspectRatio": "984 / 1273"
      }
    ]
  }
];

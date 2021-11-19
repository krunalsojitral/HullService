const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: '',
    }
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "User",
    route: "/serviceprovider",
    icon: "cil-list",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Service Provider",
        to: "/serviceprovider",
      },
      {
        _tag: "CSidebarNavItem",
        name: "General Public",
        to: "/generalpublic",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Researchers",
        to: "/researchers",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Resources",
    route: "/#",
    icon: "cil-list",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Blog",
        to: "/blog",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Article",
        to: "/article",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Video",
        to: "/video",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Course",
        to: "/course",
        icon: "cil-calculator",
        badge: {
          color: "info",
          text: "",
        },
      }
    ],
  },


  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Blog",
  //   to: "/blog",
  //   icon: "cil-calculator",
  //   badge: {
  //     color: "info",
  //     text: "",
  //   },
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Article",
  //   to: "/article",
  //   icon: "cil-calculator",
  //   badge: {
  //     color: "info",
  //     text: "",
  //   },
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Video",
  //   to: "/video",
  //   icon: "cil-calculator",
  //   badge: {
  //     color: "info",
  //     text: "",
  //   },
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Course",
  //   to: "/course",
  //   icon: "cil-calculator",
  //   badge: {
  //     color: "info",
  //     text: "",
  //   },
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Tag",
    to: "/tag",
    icon: "cil-calculator",
    badge: {
      color: "info",
      text: "",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Media",
    to: "/media",
    icon: "cil-calculator",
    badge: {
      color: "info",
      text: "",
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Forum",
    route: "/forum",
    icon: "cil-list",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Forum category",
        to: "/category",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Forum Heading",
        to: "/forumheading",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Forum",
        to: "/forum",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Home Page",
    route: "/homecontenteditform",
    icon: "cil-list",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Content",
        to: "/homecontenteditform",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Partners & Sponsors",
        to: "/partner",
      }
    ],
  }
  
]

export default _nav

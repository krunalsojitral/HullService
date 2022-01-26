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
    name: "Users",
    route: "/serviceprovider",
    icon: "cil-list",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Professionals",
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
        _tag: "CSidebarNavDropdown",
        name: "Blogs",
        route: "/#",
        icon: "cil-list",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Publish Blogs",
            to: "/blog",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Draft Blogs",
            to: "/draft-blog",
          }
        ]
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Articles",
        route: "/#",
        icon: "cil-list",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Publish Articles",
            to: "/article",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Draft Articles",
            to: "/draft-articles",
          }
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Videos",
        route: "/#",
        icon: "cil-list",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Publish Videos",
            to: "/video",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Draft Videos",
            to: "/draft-video",
          }
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Courses",
        route: "/#",
        icon: "cil-list",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Publish Courses",
            to: "/course",
            icon: "cil-calculator",
            badge: {
              color: "info",
              text: "",
            },
          },
          {
            _tag: "CSidebarNavItem",
            name: "Draft Courses",
            to: "/draft-courses",
          }
        ],
      }
    ]
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Membership Form",
    route: "/#",
    icon: "cil-list",
    _children: [
      {
        _tag: "CSidebarNavDropdown",
        name: "Professional",
        route: "/#",
        icon: "cil-list",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Sector",
            to: "/sector",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Occupation",
            to: "/occupation",
          },
          {
            _tag: "CSidebarNavItem",
            name: "Interest Area",
            to: "/professional-interest-area",
          }
          ]
      },
      {
        _tag: "CSidebarNavDropdown",
        name: "Researcher",
        route: "/#",
        icon: "cil-list",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: "Academic Discipline",
            to: "/academic-discipline",
          }, 
          {
            _tag: "CSidebarNavItem",
            name: "Interest Area",
            to: "/researcher-interest-area",
          }
        ]
      },
      {
        _tag: "CSidebarNavItem",
        name: "Organization",
        to: "/organization",
        icon: "cil-list",
      }
    ]
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Forums",
    route: "/forum",
    icon: "cil-list",
    _children: [      
      {
        _tag: "CSidebarNavItem",
        name: "Add Topics",
        to: "/forumheading",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add/View Threads",
        to: "/forum",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Thread Requests",
        to: "/forum-request",
      },
    ],
  }, 
  {
    _tag: "CSidebarNavDropdown",
    name: "Researches",
    route: "/researches",
    icon: "cil-list",
    _children: [      
      {
        _tag: "CSidebarNavItem",
        name: "View Researches",
        to: "/researches-list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Research Requests",
        to: "/research-requests",
      },
      {
        _tag: "CSidebarNavItem",
        name: "View Future Participants",
        to: "/future-participants",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Website’s content",
    route: "/homecontenteditform",
    icon: "cil-list",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Home Page Content",
        to: "/homecontenteditform",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Become a member content",
        to: "/become-member-content",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Participate in Research Content ",
        to: "/add-content-form",
      },      
      {
        _tag: "CSidebarNavItem",
        name: "Sponsors and Partners",
        to: "/partner",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Forums Content",
        to: "/forum-content",
      }      
    ],
  },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Dynamic Pages",
  //   route: "/dynamicPages",
  //   icon: "cil-list",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Menu",
  //       to: "/dynamicPages",
  //     },
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "Pages",
  //       to: "/dynamicPages",
  //     }
  //   ],
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Tag",
    route: "/#",
    to: "/tag",
    icon: "cil-list",
    badge: {
      color: "info",
      text: "",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Media",
    route: "/#",
    to: "/media",
    icon: "cil-list",
    badge: {
      color: "info",
      text: "",
    },
  },
  
]

export default _nav

import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiHome,
  mdiAccount,
  mdiAccountMultiple,
  mdiStar,
  mdiAccountGroup,
  mdiCreditCard 
} from "@mdi/js";

export default [
  {
    to: "/profile",
    label: "Profile",
    icon: mdiAccount,
    role: ['sponsor', 'admin', 'account', 'agency', 'organization', 'promoter', 'cause']
  },
  {
    to: "/dashboard",
    icon: mdiHome,
    label: "Dashboard",
    role: ['sponsor', 'admin', 'account', 'agency', 'organization', 'promoter', 'cause']
  },
  {
    to: "/users",
    label: "All Users",
    icon: mdiAccountMultiple,
    role: ['sponsor', 'cause', 'admin']
  },
  {
    to: "/campaigns",
    label: "Campaigns",
    icon: mdiSquareEditOutline,
    role: ['sponsor', 'admin', 'account', 'agency', 'organization', 'promoter', 'cause']
  },
  // {
  //   to: "/ui",
  //   label: "Credits",
  //   icon: mdiTelevisionGuide,
  // },
  {
    to: "/sponsors",
    label: "Sponsors",
    icon: mdiResponsive,
    role: ['admin', 'cause']
  },
  {
    to: "/causes",
    label: "Causes",
    icon: mdiPalette,
    role: ['sponsor', 'admin']
  },
  // {
  //   to: "/profile",
  //   label: "Influencers",
  //   icon: mdiStar,
  // },
  // {
  //   to: "/login",
  //   label: "Agencies",
  //   icon: mdiLock,
  // },
  {
    to: "/rewards-messages",
    label: "Rewards & Messages",
    icon: mdiStar,
    role: ['sponsor', 'cause', 'admin']
  },
  {
    to: "/comunity-message",
    label: "Comunity Message",
    icon: mdiAccountGroup,
    role: ['admin']
  },
  {
    to: "/credits",
    label: "Credits",
    icon: mdiCreditCard,
    role: ['sponsor', 'admin', 'agency', 'influencers']
  },
  // {
  //   to: "/error",
  //   label: "Approve",
  //   icon: mdiAlertCircle,
  // },
  // {
  //   to: "/error",
  //   label: "Delete Challenge",
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: "Reports",
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: "Users",
  //     },
  //     {
  //       label: "Challenges",
  //     },
  //     {
  //       label: "cause",
  //     },
  //     {
  //       label: "Sponsors",
  //     },
  //   ],
  // },
  // {
  //   to: "/error",
  //   label: "Text Code",
  //   icon: mdiAlertCircle,
  // },
  // {
  //   to: "/error",
  //   label: "Spin Wheel",
  //   icon: mdiAlertCircle,
  // },
  // {
  //   to: "/error",
  //   label: "Change Splash",
  //   icon: mdiAlertCircle,
  // },
  // {
  //   to: "/error",
  //   label: "Blog",
  //   icon: mdiAlertCircle,
  // },
  // {
  //   to: "/error",
  //   label: "Speaks",
  //   icon: mdiAlertCircle,
  // },
  // {
  //   to: "/error",
  //   label: "Twilio Phone Number",
  //   icon: mdiAlertCircle,
  // },
];

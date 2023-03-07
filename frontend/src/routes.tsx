import Index from "./pages/Index/Index";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Category from "./pages/Category/Category";
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo";
import React from "react";
import { RouteObject } from "react-router-dom";
import Courses from "./pages/Courses/Courses";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Articles from "./pages/Articles/Articles";
import Contact from "./pages/Contact/Contact";
import Search from "./pages/Search/Search";
import AdminPanele from "./pages/AdminPanel/index";
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/Courses/Courses";
import Menus from "./pages/AdminPanel/Menus/Menus";
import TicketsAdmin from "./pages/AdminPanel/Tickets/Tickets";
import Discounts from "./pages/AdminPanel/Discounts/Discounts";
import AdminArticles from "./pages/AdminPanel/Articles/Articles";
import Draft from "./pages/AdminPanel/Articles/draft/draft";
import CategoryList from "./pages/AdminPanel/Category/Category";
import ContactAdmin from "./pages/AdminPanel/Contact/Contact";
import Sessions from "./pages/AdminPanel/Sessions/Sessions";
import Session from "./pages/Session/Session";
import Comments from "./pages/AdminPanel/Comments/Comments";
import Offs from "./pages/AdminPanel/Offs/Offs";
import AdminIndex from "./pages/AdminPanel/Index/Index";

import UserPanel from "./pages/UserPanel/Index";
import UserPanelIndex from "./pages/UserPanel/Index/Index";
import Orders from "./pages/UserPanel/Orders/Orders";
import UserPanelCourses from "./pages/UserPanel/Courses/Courses";
import SendTicket from "./pages/UserPanel/Tickets/SendTicket";
import TicketUser from "./pages/UserPanel/Tickets/Tickets";
import UserPanelTicketAnswer from "./pages/UserPanel/Tickets/TicketAnswer";
import EditAccount from "./pages/UserPanel/EditAccount/EditAccount";

import PAdminPrivate from "./Components/Privates/PAdminPrivate";

const routes: RouteObject[] = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/courese/:page", element: <Courses /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },

  { path: "/search/:value", element: <Search /> },
  { path: "/:courseName/:sessionID", element: <Session /> },
  {
    path: "/p-admin/*",
    element: (
      <PAdminPrivate>
        <AdminPanele />
      </PAdminPrivate>
    ),
    children: [
      { path: "", element: <AdminIndex /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "articles/draft/:shortName", element: <Draft /> },
      { path: "category", element: <CategoryList /> },
      { path: "contacts", element: <ContactAdmin /> },
      { path: "sessions", element: <Sessions /> },
      { path: "comments", element: <Comments /> },
      { path: "offs", element: <Offs /> },
      { path: "tickets", element: <TicketsAdmin /> },
      { path: "discounts", element: <Discounts /> },
    ],
  },
  {
    path: "/my-account/*",
    element: <UserPanel />,
    children: [
      { path: "", element: <UserPanelIndex /> },
      { path: "orders", element: <Orders /> },
      { path: "courses", element: <UserPanelCourses /> },
      { path: "send-ticket", element: <SendTicket /> },
      { path: "Tickets", element: <TicketUser /> },
      { path: "tickets/answer/:id", element: <UserPanelTicketAnswer /> },
      { path: "edit-accuont", element: <EditAccount /> },
    ],
  },
];

export default routes;

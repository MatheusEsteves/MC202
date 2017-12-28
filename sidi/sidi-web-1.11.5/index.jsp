<html>
    <head>
        <meta http-equiv="refresh" content="1;url=<%=request.getContextPath()%>/pages/index.jsp"/>
    </head>
    <body>
        Redirecionando...
    </body>
</html>


<%
HttpServletResponse httpResponse = (HttpServletResponse) response;
httpResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
httpResponse.setHeader("Pragma", "no-cache"); // HTTP 1.0
httpResponse.setDateHeader("Expires", 0); // Proxies.
%>
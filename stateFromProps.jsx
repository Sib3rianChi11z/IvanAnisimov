static getDerivedStateFromProps(nextProps, prevState) {
    const type =
      nextProps.location.state && !prevState.currentUser.isLoggedIn
        ? nextProps.location.state.type
        : "";
    switch (type) {
      case "login":
        return nextProps.location.state.user.name !==
          prevState.currentUser.email
          ? {
              currentUser: {
                isLoggedIn: true,
                ...nextProps.location.state.user,
                routes: allRoutes.filter(route => {
                  return route.roles.includes(
                    nextProps.location.state.user.roles[0]
                  );
                })
              },
              loading: false
            }
          : null;
      default:
        return prevState.currentUser.isLoggedIn
          ? {
              currentUser: {
                ...prevState.currentUser
              }
            }
          : null;
    }
  }

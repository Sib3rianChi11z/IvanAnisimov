 getAdminContent = () => (
    <Suspense fallback={<LoadingOverlay {...this.props} />}>
      <Switch location={this.props.location}>
        <Route
          exact
          path={"/"}
          render={props => (
            <PublicLanding {...props} currentUser={this.state.currentUser} />
          )}
        />
        <Route exact path={"/survey"} render={props => <Survey {...props} />} />
        <Route path={`/contacts`} component={Contact} />
        <Route path={`/forgotpassword`} component={ForgotPassWord} />
        <Route path={`/resetpassword`} component={ResetPassword} />
        <Route path={`/registrationForm`} component={Register} />{" "}
        {/* Added this for Admin Access */}
        <Route path={`/email/confirm/`} component={Confirm} />{" "}
        {/* Added this for Admin Access */}
        <App>
          <Suspense fallback={<LoadingOverlay {...this.props} />}>
            {this.state.currentUser.routes.map((route, idx) => (
              <Route
                key={idx + 1}
                currentUser={this.state.currentUser}
                {...route}
              />
            ))}
          </Suspense>
        </App>
        <Route
          render={props => (
            <Error404 {...props} currentUser={this.state.currentUser} />
          )}
        />
      </Switch>
    </Suspense>
  );
  getSimpleContent = () => (
    <Suspense fallback={<LoadingOverlay {...this.props} />}>
      <Switch location={this.props.location}>
        <Route
          exact
          path={"/"}
          render={props => (
            <PublicLanding {...props} currentUser={this.state.currentUser} />
          )}
        />
        <Route path={`/email/confirm/`} component={Confirm} />
        <Route exact path={"/survey"} render={props => <Survey {...props} />} />
        <Route path={`/login`} component={Login} />
        <Route path={`/registrationForm`} component={Register} />
        <Route path={`/contacts`} component={Contact} />
        <Route path={`/forgot-password`} component={ForgotPassWord} />
        <Route path={`/reset-password`} component={ResetPassword} />
        <Route
          render={props => (
            <Error404 {...props} currentUser={this.state.currentUser} />
          )}
        />
      </Switch>
    </Suspense>
  );

import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Preloader from './Preloader';
import { Auth } from './contexts/Auth';
import { Hook } from './contexts/Hook';
import { MustBeOut } from './contexts/MustBeOut';
import { MustLogin } from './contexts/MustLogin';
import { User } from './contexts/User';
import { Promotion } from './contexts/Promotions';
import { Tasks } from './contexts/Tasks';
import { Wallet } from './contexts/Wallet';
import { useEffect } from 'react';
import Network from './Network';
import ReferNEarn from './user/profile/ReferNEarn';
import Performed from './user/tasks/Performed';
import ViewProof from './user/tasks/ViewProof';
import Reset from './pages/signIn/Reset';
import Dashboard from './user/dashboard/Dashboard';
import NewPromotion from './user/promotion/NewPromotion';
import ManagePromotions from './user/promotion/ManagePromotions';
import ManagePromotion from './user/promotion/ManagePromotion';
import Earn from './user/promotion/Earn';
import NewTask from './user/tasks/NewTask';
import ManageTask from './user/tasks/ManageTask';
import Make from './user/tasks/Make';
import ViewTask from './user/tasks/ViewTask';
import Approve from './user/tasks/Approve';
import DoTask from './user/tasks/DoTask';
import Activities from './user/Activities';
import Transfer from './user/wallet/Transfer';
import TestFund from './user/wallet/TestFund';
import Upgrade from './user/profile/Upgrade';
import Withdraw from './user/wallet/Withdraw';
import Profile from './user/profile/Profile';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ManageTasks from './user/tasks/ManageTasks';


function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      return true;
    }
  }, [location.key]);


  return (
    
    <Hook>
      <Network />
      <Auth>
        <User>
          <Promotion>
            <Tasks>
              <Wallet>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <MustLogin>
                        <Dashboard />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/contact-us"
                    element={
                      <Preloader />
                    }
                  />

                  <Route
                    exact
                    path="/dashboard"
                    element={

                      <MustLogin>
                        <Dashboard />
                      </MustLogin>

                    }
                  />

                  <Route
                    exact
                    path="/promotion/new"
                    element={
                      <MustLogin>
                        <NewPromotion />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/promotion/manage"
                    element={
                      <MustLogin>
                        <ManagePromotions />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/history/performed"
                    element={
                      <MustLogin>
                        <Performed />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/history/performed/:unique_id"
                    element={
                      <MustLogin>
                        <ViewProof />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/promotion/manage/:unique_id"
                    element={
                      <MustLogin>
                        <ManagePromotion />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/earn_credits"
                    element={
                      <MustLogin>
                        <Earn />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/task/new"
                    element={
                      <MustLogin>
                        <NewTask />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/task/manage"
                    element={
                      <MustLogin>
                        <ManageTasks />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/task/manage/:unique_id"
                    element={
                      <MustLogin>
                        <ManageTask />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/make_money"
                    element={
                      <MustLogin>
                        <Make />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/task/view/:unique_id"
                    element={
                      <MustLogin>
                        <ViewTask />
                      </MustLogin>
                    }
                  />


                  <Route
                    exact
                    path="/task/view/:unique_id/creator"
                    element={
                      <MustLogin>
                        <Approve />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/task/do/:unique_id"
                    element={
                      <MustLogin>
                        <DoTask />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/activities"
                    element={
                      <MustLogin>
                        <Activities />
                      </MustLogin>
                    }
                  />

                  {/* Wallet routes  */}

                  {/* <Route
                    exact
                    path="/wallet/transfer"
                    element={
                      <MustLogin>
                        <Transfer />
                      </MustLogin>
                    }
                  /> */}

                  <Route
                    exact
                    path="/wallet/add_fund"
                    element={
                      <MustLogin>
                        <TestFund />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/package/upgrade"
                    element={
                      <MustLogin>
                        <Upgrade />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/account/upgrade"
                    element={
                      <MustLogin>
                        <Upgrade />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/test_fund"
                    element={
                      <MustLogin>
                        <TestFund />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/wallet/withdraw"
                    element={
                      <MustLogin>
                        <Withdraw />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/wallet/withdraw"
                    element={
                      <MustLogin>
                        <Profile />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/profile"
                    element={
                      <MustLogin>
                        <Profile />
                      </MustLogin>
                    }
                  />

                  <Route
                    exact
                    path="/refer-n-earn"
                    element={
                      <MustLogin>
                        <ReferNEarn />
                      </MustLogin>
                    }
                  />
                </Routes>
              </Wallet>
            </Tasks>
          </Promotion>
        </User>
      </Auth >

      <Auth>
        <User>
          <Routes>
            {/* sign user in starts  */}
            <Route
              exact
              path="/sign-in"
              element={
                <MustBeOut>
                  <SignIn />
                </MustBeOut>
              }
            />
            {/* sign user in ends  */}

            {/* sign user up starts  */}
            <Route
              exact
              path="/sign-up"
              element={
                <SignUp />
              }
            />

            {/* sign user up starts  */}
            <Route
              exact
              path="/reset-password"
              element={
                <Reset />
              }
            />

            <Route
              exact
              path="/sign-up/:referee"
              element={
                <SignUp />
              }
            />

            <Route
              exact
              path="/sign_up/:referee"
              element={
                <SignUp />
              }
            />
            {/* sign user up ends  */}
          </Routes>
        </User>
      </Auth>

    </Hook >
  );
}

export default App;

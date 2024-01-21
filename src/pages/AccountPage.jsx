import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostsByUserId, getUserById, setUserId } from '../libs';
import UploadFile from '../components/UploadFile';
import PostCard from '../components/cards/PostCard';
import Input from '../components/Input';

/**
 *
 * check current user in account page
 * fetch user by Id
 */
const AccountPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  /**
   * Calling current user to check (state)
   * Allowing to update based on current userId
   */
  useEffect(() => {
    const fetchAPI = async () => {
      /** Promise all for fetching user, post data */
      try {
        Promise.all([getUserById(userId), getPostsByUserId(userId)]).then(
          ([{ data: userData, status: userStatus }, { data: postDataa, status: postStatus }]) => {
            if (userStatus === 200 || postStatus === 200) {
              console.log(userData, postDataa);
              setUser(userData); //
              setPosts(postDataa);
            }
          }
        );
      } catch (error) {
        console.error();
      }
    };
    fetchAPI();
    return () => {
      setUser({});
    };
  }, [userId]);

  return (
    <div className="container-2xl mx-10 mb-10">
      <h1 className="headingPage mb-10 mt-5">{user.name}</h1>
      <div className="grid grid-cols-5 gap-10">
        {/** edit part */}
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-20">
            <div className="col-span-1">
              <UploadFile setUrl={setImageUrl} imageUrl={user.avatarURL} />
            </div>
            {/** form update */}
            <div className='col-span-2'>
              <Input />
            </div>
          </div>
        </div>
        {/** post part */}
        <div className="col-span-2">
          <div className="flex flex-col gap-4">
            {posts.map((i, idx) => (
              /** post Data */
              <PostCard key={idx} postId={i.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

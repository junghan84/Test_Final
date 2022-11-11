import React, {useState} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';


import { Cloudinary } from "@cloudinary/url-gen";
import ImageUpload from "../components/ImageUpload";


import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [imagesUploadedList, setImagesUploadedList] = useState([]);  
  

  const cld = new Cloudinary({
    cloud: {
      cloud_name: "cloud_name", //Your cloud name
      upload_preset: "unsigned_upload_preset" //Create an unsigned upload preset and update this
    }
  });
  const onImageUploadHandler = (publicId) => {
    setImagesUploadedList((prevState) => [...prevState, publicId]);
  };


  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/me" />;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }
 console.log(imagesUploadedList)
  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          Something here
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            Something else here
          </div>     
          
        )}
      </div>
      <div className="col-12 col-md-10 mb-5">
      <ImageUpload
        cloud_name={cld.cloudinaryConfig.dkrgydudr}
        upload_preset={cld.cloudinaryConfig.nmqlk7x4}
        onImageUpload={(publicId) => onImageUploadHandler(publicId)}
      />

        </div>
    </div>
  );
};

export default Profile;

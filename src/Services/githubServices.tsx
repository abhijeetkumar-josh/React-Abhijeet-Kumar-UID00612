import axios, { AxiosError } from 'axios';
import { UserData } from '@components/Profile/UserCard';

export const getFollowers = async (
  username: string,
  token: string,
  page: number,
  per_page: number
) => {
  const encodedUsername = encodeURIComponent(username);
  return getUsersData(
    `https://api.github.com/users/${encodedUsername}/followers?per_page=${per_page}&page=${page}`,
    token
  );
};

export const getSuggestedUsers = async (since: number, token: string, per_page: number) => {
  return getUsersData(`https://api.github.com/users?since=${since}&per_page=${per_page}`, token);
};

export const getUsersData = async (api_url: string, token: string) => {
  const res = await axios.get(api_url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  return res.data;
};

export const followUser = async (targetUsername: string, token: string) => {
  await axios.put(
    `https://api.github.com/user/following/${targetUsername}`,
    {},
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
      },
    }
  );
};

export const isFollowingUser = async (targetUsername: string, token: string): Promise<boolean> => {
  try {
    const res = await axios.get(`https://api.github.com/user/following/${targetUsername}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });
    return res.status === 204;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return false;
    }
    throw error;
  }
};

export const getUserByUsername = async (username: string):Promise<UserData | null>  => {
  try {
    const encodedUsername = encodeURIComponent(username);
    const response = await axios.get(`https://api.github.com/users/${encodedUsername}`, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return null;
      }
    }
    throw error;
  }
};

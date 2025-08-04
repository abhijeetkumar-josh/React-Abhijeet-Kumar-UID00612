import axios from 'axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import {
  getFollowers,
  getSuggestedUsers,
  getUsersData,
  followUser,
  isFollowingUser,
} from './githubServices';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, { deep: true });

const dummyToken = 'fake_token';
const dummyUser = 'dummyuser';
const dummyPage = 1;
const dummyPerPage = 5;
const dummySince = 100;

const mockFollowers = [
  { login: 'follower1', id: 1 },
  { login: 'follower2', id: 2 },
];

const mockSuggestedUsers = [
  { login: 'user1', id: 101 },
  { login: 'user2', id: 102 },
];

describe('GitHub API service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getFollowers should call axios with correct URL and return data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockFollowers });

    const result = await getFollowers(dummyUser, dummyToken, dummyPage, dummyPerPage);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.github.com/users/${dummyUser}/followers?per_page=${dummyPerPage}&page=${dummyPage}`,
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `token ${dummyToken}` }),
      })
    );
    expect(result).toEqual(mockFollowers);
  });

  it('getSuggestedUsers should call axios with correct URL and return data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockSuggestedUsers });

    const result = await getSuggestedUsers(dummySince, dummyToken, dummyPerPage);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.github.com/users?since=${dummySince}&per_page=${dummyPerPage}`,
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `token ${dummyToken}` }),
      })
    );
    expect(result).toEqual(mockSuggestedUsers);
  });

  it('getUsersData should return data from API', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockFollowers });
    const result = await getUsersData('https://example.com', dummyToken);
    expect(result).toEqual(mockFollowers);
  });

  it('followUser should call PUT with correct URL and headers', async () => {
    mockedAxios.put.mockResolvedValueOnce({});
    await followUser('targetUser', dummyToken);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `https://api.github.com/user/following/targetUser`,
      {},
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `token ${dummyToken}` }),
      })
    );
  });

  it('isFollowingUser should return true if status 204', async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 204 });
    const result = await isFollowingUser('targetUser', dummyToken);
    expect(result).toBe(true);
  });

  it('isFollowingUser should return false if error occurs', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Not following'));
    const result = await isFollowingUser('targetUser', dummyToken);
    expect(result).toBe(false);
  });
});

"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useIdleTimer } from "react-idle-timer";

const defaultLimit = 6;

interface Post {
  id: number;
  title: string;
  body: string;
}

const DashboardPage: React.FC = () => {
  const { name, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const idle = useIdleTimer({ onIdle: logout, timeout: 1000 * 120 }); // 2 minutes of unactivity

  const fetchPosts = useCallback(() => {
    const start = (page - 1) * defaultLimit;

    setLoading(true);

    fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${defaultLimit}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    fetchPosts();
  }, [page, fetchPosts]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      height='inherit'
    >
      <Typography variant='h4' component='h1' align='center' mt={6} mb={2}>
        Welcome, {name}!
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box display='flex' gap='1rem' flexDirection='column'>
          {posts.map((post) => (
            <Card variant='outlined' key={post.id}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  {post.title}
                </Typography>
                <Typography variant='h5' component='div'>
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      {!loading && (
        <Box my={2}>
          <Pagination
            count={Math.floor(100 / defaultLimit)}
            page={page}
            onChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;

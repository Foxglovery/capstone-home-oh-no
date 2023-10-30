useEffect(() => {
  GetHomesByUserId(currentUser.id).then((homesArray) => {
    const currentHomeData = homesArray.find(home => home.homeId === currentHomeId && home.userId === currentUser.id)
      setHome({
          name:currentHomeData.name,
          description: currentHomeData.description,
          imgUrl: currentHomeData.imgUrl
      })
  })
},[currentUser])
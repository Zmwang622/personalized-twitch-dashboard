// This is where all the logic for your Twitch API will live!
const HOST_NAME = 'https://api.twitch.tv/helix'
const AUTH_HOST_NAME = 'https://id.twitch.tv'
export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { data } = req.body

      // Search Twitch API
      if (data) {
        const channelData = await getTwitchChannel(data)

        if (channelData) {
          console.log(`Channel Data: `, channelData)
          res.status(200).json({ data: channelData})
        }
      }

      res.status(404).send()
    }
  } catch (error) {
    console.warn(error.message)
    res.status(500).send()
  }
}

// Actions
const getTwitchAccessToken = async () => {
  console.log("Getting Access Token")

  const path = `${AUTH_HOST_NAME}/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET_ID}&grant_type=client_credentials`


  const resp = await fetch(path, {
    method: 'POST'
  })

  if (resp) {
    const json = await resp.json()

    return json.access_token
  }
}
const getTwitchChannel = async channelName => {
  const accessToken = await getTwitchAccessToken()

  if (accessToken) {
    const response = await fetch(`${HOST_NAME}/search/channels?query=${channelName}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID
      }

    })

    const json = await response.json()

    if (json.data) {
      const { data } = json

      const lowerChannelName = channelName.toLowerCase()

      const foundChannel = data.find(channel => {
        const lowerTwitchChannel = channel.display_name.toLowerCase()
        return lowerChannelName === lowerTwitchChannel
      })

      return foundChannel
    }
  }
}
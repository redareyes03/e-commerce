export default async function handler(req, res) {

  if (!req.query.secret || req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).send('Unauthorized');
  }

  try {
    await res.unstable_revalidate('/');
    return res.status(200).send('ok');
  } catch (error) {
    return res.status(400).send('error')
  }

}


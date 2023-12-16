export default function handler(req, res) {
  const { url } = JSON.parse(req.body);
  res.status(200).json({ url: url });
}

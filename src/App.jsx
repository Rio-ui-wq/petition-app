import { useState } from "react";
import {
  Box, Container, Heading, Text, Input, Textarea,
  Button, VStack, Divider, useToast
} from "@chakra-ui/react";
import {
  Box, Container, Heading, Text, Input, Textarea,
  Button, VStack, Divider, useToast, Select
} from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!title || !content || !city || !email) {
      toast({
        title: "入力してください",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/petition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, city, content, email, name, genre })
      });
      const data = await res.json();
      setResult(data);
      setTitle("");
      setContent("");
    } catch (err) {
      toast({
        title: "エラーが発生しました",
        status: "error",
        duration: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <Box minH="100vh" bg="#ffffff">
      {/* ヘッダー */}
      <Box borderBottom="1px solid" borderColor="#e8e8e8" px={{ base: 5, md: 12 }} py={4}>
        <Text fontWeight="900" fontSize="sm" color="#1a1a1a" letterSpacing="0.1em">
          CITY VOICE
        </Text>
      </Box>

      {/* ヒーロー */}
      <Box bg="#f9c823" py={{ base: 16, md: 24 }} px={{ base: 5, md: 12 }}>
        <Container maxW="680px">
          <Text fontSize="xs" fontWeight="700" color="#1a1a1a" letterSpacing="0.2em" mb={4}>
            CITIZEN PETITION FORM
          </Text>
          <Heading
            fontWeight="900"
            fontSize={{ base: "3xl", md: "5xl" }}
            color="#1a1a1a"
            lineHeight="1.1"
            mb={4}
          >
            まちへの声を、<br />カタチにしよう。
          </Heading>
          <Text fontSize="sm" color="#555" fontWeight="500">
            あなたの意見やアイデアが、まちをよくする第一歩です。
          </Text>
        </Container>
      </Box>

      {/* フォーム */}
      <Box py={{ base: 12, md: 20 }} px={{ base: 5, md: 12 }}>
        <Container maxW="680px">
          {result ? (
            <Box py={12} textAlign="center">
              <Text fontSize="4xl" mb={4}>✓</Text>
              <Heading fontWeight="900" fontSize="2xl" color="#1a1a1a" mb={3}>
                送信完了しました。ご意見ありがとうございます！
              </Heading>
              <Text fontSize="sm" color="#888" mb={8}>
                ご意見を受け付けました。担当者よりご連絡する場合がございます。
              </Text>
              <Button
                onClick={() => setResult(null)}
                variant="outline"
                borderColor="#1a1a1a"
                borderRadius="none"
                fontWeight="700"
                px={8}
                transition="all 0.2s"
                bg="#f9c823"
                color="#1a1a1a"
                _hover={{ bg: "#e6b800" }}
                              >
                続けて送る
              </Button>
            </Box>
          ) : (
            <VStack spacing={8} align="stretch">
              <Box>
                <Text fontSize="xs" fontWeight="700" color="#888" letterSpacing="0.15em" mb={3}>
                  TITLE
                </Text>
                
                <Select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  border="none"
                  borderBottom="2px solid"
                  borderColor="#1a1a1a"
                  borderRadius="none"
                  px={0}
                  fontSize="md"
                  fontWeight="600"
                  color="#1a1a1a"
                  _focus={{ boxShadow: "none" }}
                >
                  <option value="">選択してください</option>
                  <option value="道路・交通">道路・交通</option>
                  <option value="公園・環境">公園・環境</option>
                  <option value="子育て・教育">子育て・教育</option>
                  <option value="福祉・医療">福祉・医療</option>
                  <option value="防災・安全">防災・安全</option>
                  <option value="まちづくり">まちづくり</option>
                  <option value="その他">その他</option>
                </Select>
              </Box>
              <Divider borderColor="#e8e8e8" />

              <Box>
                <Text fontSize="xs" fontWeight="700" color="#888" letterSpacing="0.15em" mb={3}>
                  お名前（任意・ニックネーム可）
                </Text>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例：田中太郎"
                  border="none"
                  borderBottom="2px solid"
                  borderColor="#1a1a1a"
                  borderRadius="none"
                  px={0}
                  fontSize="lg"
                  fontWeight="600"
                  color="#1a1a1a"
                  _placeholder={{ color: "#ccc" }}
                  _focus={{ boxShadow: "none", borderColor: "#555" }}
                />
              </Box>

              <Divider borderColor="#e8e8e8" />

              <Box>
                <Text fontSize="xs" fontWeight="700" color="#888" letterSpacing="0.15em" mb={3}>
                  メールアドレス
                </Text>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  border="none"
                  borderBottom="2px solid"
                  borderColor="#1a1a1a"
                  borderRadius="none"
                  px={0}
                  fontSize="lg"
                  fontWeight="600"
                  color="#1a1a1a"
                  _placeholder={{ color: "#ccc" }}
                  _focus={{ boxShadow: "none", borderColor: "#555" }}
                />
              </Box>
              <Divider borderColor="#e8e8e8" />
              <Box>
                <Text fontSize="xs" fontWeight="700" color="#888" letterSpacing="0.15em" mb={3}>
                  お住まいの市区町村
                </Text>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="例：さいたま市浦和区"
                  border="none"
                  borderBottom="2px solid"
                  borderColor="#1a1a1a"
                  borderRadius="none"
                  px={0}
                  fontSize="lg"
                  fontWeight="600"
                  color="#1a1a1a"
                  _placeholder={{ color: "#ccc" }}
                  _focus={{ boxShadow: "none", borderColor: "#555" }}
                />
              </Box>

              <Divider borderColor="#e8e8e8" />

              <Box>
                <Text fontSize="xs" fontWeight="700" color="#888" letterSpacing="0.15em" mb={3}>
                  MESSAGE
                </Text>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="詳しい内容をご記入ください。"
                  border="none"
                  borderBottom="2px solid"
                  borderColor="#1a1a1a"
                  borderRadius="none"
                  px={0}
                  fontSize="md"
                  fontWeight="500"
                  color="#1a1a1a"
                  maxLength={1000}
                  _placeholder={{ color: "#ccc" }}
                  _focus={{ boxShadow: "none", borderColor: "#555" }}
                  rows={8}
                  resize="none"
                />
                <Text fontSize="xs" color="#aaa" textAlign="right" mt={1}>
                  {content.length} / 1000
                </Text>
              </Box>

              <Box pt={4}>
                <Button
                  onClick={handleSubmit}
                  isLoading={loading}
                  loadingText="送信中..."
                  bg="#1a1a1a"
                  color="white"
                  borderRadius="none"
                  h="56px"
                  px={12}
                  fontSize="sm"
                  fontWeight="700"
                  letterSpacing="0.1em"
                  _hover={{ bg: "#333" }}
                  transition="all 0.2s"
                >
                  送信する →
                </Button>
              </Box>

              <Box pt={4} borderTop="1px solid" borderColor="#e8e8e8">
                <Text fontSize="xs" color="#aaa">
                  💡 道路・公園・子育て・防災・多文化共生など、どんな声でも歓迎です。
                </Text>
              </Box>
            </VStack>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default App;
import { View, Text, Image } from "react-native";
import theme, { font } from "../theme";
export default function RepositoryItem({
  ownerAvatarUrl,
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
  children,
}) {
  return (
    <View
      testID="repositoryItem"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 10,
        fontFamily: font,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View>
          <Image
            testID="repository_image"
            style={{
              height: 60,
              width: 60,
              borderRadius: 5,
              margin: 5,
              marginRight: 20,
            }}
            source={{
              uri: ownerAvatarUrl,
            }}
          />
        </View>
        <View>
          <Text
            testID="name"
            style={{ fontWeight: "bold", marginVertical: 6, fontFamily: font }}
          >
            {fullName}
          </Text>
          <Text
            testID="description"
            style={{ marginVertical: 10, fontFamily: font }}
          >
            {description}
          </Text>
          <View style={{ alignItems: "baseline" }}>
            <Text
              testID="language"
              style={{
                marginTop: 2,
                marginBottom: 10,
                backgroundColor: theme.colors.laguageBackground,
                padding: 4,
                borderRadius: 5,
                color: "white",
                fontFamily: font,
              }}
            >
              {language}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }} testID="stargazersCount">
            {stargazersCount}k
          </Text>
          <Text style={{ color: theme.colors.textSecondary }} testID="stars">
            Stars
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }} testID="forksCount">
            {forksCount}k
          </Text>
          <Text style={{ color: theme.colors.textSecondary }}>Forks</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }} testID="reviewCount">
            {reviewCount}
          </Text>
          <Text style={{ color: theme.colors.textSecondary }}>Reviews</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }} testID="ratingAverage">
            {ratingAverage}
          </Text>
          <Text style={{ color: theme.colors.textSecondary }}>Rating</Text>
        </View>
      </View>
      {children}
    </View>
  );
}

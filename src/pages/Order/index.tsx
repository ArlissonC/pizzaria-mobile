import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from "react-native";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { orderService } from "../../services/order";
import { ListCategoriesResponse } from "../../services/category/category.types";
import { categoryService } from "../../services/category";
import ModalPicker from "../../components/ModalPicker";
import { productService } from "../../services/product";
import { Product } from "../../services/product/product.types";
import ListItem from "../../components/ListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type RouteDetailParams = {
  Order: {
    table: string;
    order_id: string;
  };
};

type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};

type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [categories, setCategories] = useState<ListCategoriesResponse[]>([]);
  const [amount, setAmount] = useState("1");
  const [items, setItems] = useState<ItemProps[]>([]);
  const [categorySelected, setCategorySelected] =
    useState<ListCategoriesResponse>();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [modalProductVisible, setModalProductVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productSelected, setProductSelected] = useState<Product>();

  const handleCloseOrder = async () => {
    const res = await orderService.closeTable(route.params.order_id);

    if (res) navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      const resCategories = await categoryService.listCategories();

      if (resCategories) {
        setCategories(resCategories);
        setCategorySelected(resCategories[0]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (categorySelected) {
        const resProducts = await productService.getProductsByCategory({
          category_id: categorySelected.id,
        });

        if (resProducts) {
          setProducts(resProducts);
          setProductSelected(resProducts[0]);
        }
      }
    })();
  }, [categorySelected]);

  const handleChangeCategory = (item: ListCategoriesResponse) => {
    setCategorySelected(item);
  };

  const handleChangeProduct = (item: Product) => {
    setProductSelected(item);
  };

  const handleAdd = async () => {
    const res = await orderService.addProductsOrder({
      amount: Number(amount),
      order_id: route.params.order_id,
      product_id: productSelected?.id!,
    });

    if (res) {
      const data = {
        ...res,
        name: productSelected?.name as string,
      };

      setItems((prev) => [...prev, data]);
    }
  };

  const handleRemove = async (item_id: string) => {
    const res = await orderService.removeProductsOrder(item_id);

    if (res) {
      setItems((prev) => prev.filter((i) => i.id !== res.id));
    }
  };

  const handleFinishOrder = () => {
    navigation.navigate("FinishOrder", {
      table: route.params.table,
      order_id: route.params.order_id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.table}</Text>
        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={28} color="#FF3F4b" />
          </TouchableOpacity>
        )}
      </View>

      {categories.length > 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={{ color: "#FFF" }}>{categorySelected?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length > 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={{ color: "#FFF" }}>{productSelected?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          placeholderTextColor="#F0F0F0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
          disabled={items.length === 0}
          onPress={handleFinishOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem data={item} deleteItem={handleRemove} />
        )}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={categories}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginRight: 14,
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    width: "100%",
    height: 40,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#FFF",
    fontSize: 20,
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonAdd: {
    width: "20%",
    backgroundColor: "#3fd1ff",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#101026",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    height: 40,
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
});

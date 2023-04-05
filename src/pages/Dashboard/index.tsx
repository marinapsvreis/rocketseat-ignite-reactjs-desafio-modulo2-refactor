import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useEffect, useState } from 'react';

interface Food {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface FoodResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

const initialFood = {
  id: 0,
  name: '',
  description: '',
  price: 0,
  image: '',
  available: true
}

export default function Dashboard() {
  const [foods, setFoods] = useState<FoodResponse[]>([]);
  const [editingFood, setEditingFood] = useState<FoodResponse>(initialFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, seteditModalOpen] = useState(false);

  useEffect(() => {
    componentDidMount();
  }, [])

  async function componentDidMount() {
    const response = await api.get('/foods');

    setFoods(response.data);
  }

  async function handleAddFood(food: Food) {

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: Food) {

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(){
    seteditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: FoodResponse){
    setEditingFood(food);
    seteditModalOpen(true);
  }

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
};

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import data from './professeurs.json';

const DashboardPage = () => {
  const [specialtiesChartData, setSpecialtiesChartData] = useState([]);
  const [citiesChartData, setCitiesChartData] = useState([]);
  const [gradesChartData, setGradesChartData] = useState([]);
  const [professorsPerSpecialty, setProfessorsPerSpecialty] = useState({});
  const [professorsPerCity, setProfessorsPerCity] = useState({});
  const [professorsPerGrade, setProfessorsPerGrade] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      const specialties = data.reduce((acc, professor) => {
        const { specialite } = professor;
        if (acc[specialite]) {
          acc[specialite] += 1;
        } else {
          acc[specialite] = 1;
        }
        return acc;
      }, {});

      const cities = data.reduce((acc, professor) => {
        const { villeDesiree } = professor;
        const citiesList = villeDesiree.split(';');
        citiesList.forEach((city) => {
          if (acc[city]) {
            acc[city] += 1;
          } else {
            acc[city] = 1;
          }
        });
        return acc;
      }, {});

      const grades = data.reduce((acc, professor) => {
        const { grade } = professor;
        if (acc[grade]) {
          acc[grade] += 1;
        } else {
          acc[grade] = 1;
        }
        return acc;
      }, {});

      const sortedSpecialties = Object.keys(specialties).sort(
        (a, b) => specialties[b] - specialties[a]
      );
      const sortedCities = Object.keys(cities).sort(
        (a, b) => cities[b] - cities[a]
      );
      const sortedGrades = Object.keys(grades).sort(
        (a, b) => grades[b] - grades[a]
      );

      const topSpecialties = sortedSpecialties.slice(0, 13);
      const topCities = sortedCities.slice(0, 13);
      const topGrades = sortedGrades.slice(0, 13);

      const totalProfessors = Object.values(specialties).reduce(
        (sum, count) => sum + count,
        0
      );
      const totalCities = Object.values(cities).reduce(
        (sum, count) => sum + count,
        0
      );
      const totalGrades = Object.values(grades).reduce(
        (sum, count) => sum + count,
        0
      );

      const specialtiesChartData = topSpecialties.map((specialty) => ({
        name: specialty,
        population: Math.round((specialties[specialty] / totalProfessors) * 100),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      }));

      const citiesChartData = topCities.map((city) => ({
        name: city,
        population: Math.round((cities[city] / totalCities) * 100),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      }));

      const gradesChartData = topGrades.map((grade) => ({
        name: grade,
        population: Math.round((grades[grade] / totalGrades) * 100),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      }));

      setSpecialtiesChartData(specialtiesChartData);
      setCitiesChartData(citiesChartData);
      setGradesChartData(gradesChartData);
      setProfessorsPerSpecialty(specialties);
      setProfessorsPerCity(cities);
      setProfessorsPerGrade(grades);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Number of professors per speciality</Text>
        <PieChart
          data={specialtiesChartData}
          width={300}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chartContainer}
          legendFormatter={(value, name) => `${value}% - ${name}`}
        />
        <View style={styles.card}>
          {specialtiesChartData.map((item) => (
            <View key={item.name} style={styles.cardItem}>
              <Text style={[styles.specialty, { color: item.color }]}>
                {item.name}
              </Text>
              <Text style={styles.professors}>
                {professorsPerSpecialty[item.name]} professeur
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>Most desired cities</Text>
        <PieChart
          data={citiesChartData}
          width={300}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chartContainer}
          legendFormatter={(value, name) => `${value}% - ${name}`}
        />
        <View style={styles.card}>
          {citiesChartData.map((item) => (
            <View key={item.name} style={styles.cardItem}>
              <Text style={[styles.specialty, { color: item.color }]}>
                {item.name}
              </Text>
              <Text style={styles.professors}>
                {professorsPerCity[item.name]} professeur
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>Number of professors per grade</Text>
        <PieChart
          data={gradesChartData}
          width={300}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chartContainer}
          legendFormatter={(value, name) => `${value}% - ${name}`}
        />
        <View style={styles.card}>
          {gradesChartData.map((item) => (
            <View key={item.name} style={styles.cardItem}>
              <Text style={[styles.specialty, { color: item.color }]}>
                {item.name}
              </Text>
              <Text style={styles.professors}>
                {professorsPerGrade[item.name]} professeur
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  specialty: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  professors: {
    fontSize: 16,
  },
  additionalContent: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DashboardPage;

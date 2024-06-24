import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import Chart from "react-apexcharts";

const SuperAdminAnalyticsReportingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [userActivities, setUserActivities] = useState([]);
  const [applicationProcesses, setApplicationProcesses] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userActivitiesSnapshot = await getDocs(
          collection(db, "userActivities")
        );
        const applicationProcessesSnapshot = await getDocs(
          collection(db, "applicationProcesses")
        );
        const maintenanceRequestsSnapshot = await getDocs(
          collection(db, "maintenanceRequests")
        );
        const paymentsSnapshot = await getDocs(collection(db, "payments"));

        setUserActivities(userActivitiesSnapshot.docs.map((doc) => doc.data()));
        setApplicationProcesses(
          applicationProcessesSnapshot.docs.map((doc) => doc.data())
        );
        setMaintenanceRequests(
          maintenanceRequestsSnapshot.docs.map((doc) => doc.data())
        );
        setPayments(paymentsSnapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderChart = (title, data) => {
    const options = {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: data.map((item, index) => `Item ${index + 1}`),
      },
      series: [
        {
          name: title,
          data: data.map((item) => item.value), // assuming data has a 'value' field
        },
      ],
    };

    return (
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Chart
            options={options}
            series={options.series}
            type="bar"
            width="100%"
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Analytics & Reporting
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {renderChart("User Activities", userActivities)}
          {renderChart("Application Processes", applicationProcesses)}
          {renderChart("Maintenance Requests", maintenanceRequests)}
          {renderChart("Payments", payments)}
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Custom Reports
              </Typography>
              <Typography variant="body2" component="p">
                Generate custom reports tailored to specific needs.
              </Typography>
              <Button variant="contained" color="primary" style={styles.button}>
                Generate Reports
              </Button>
            </CardContent>
          </Card>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Performance Metrics
              </Typography>
              <Typography variant="body2" component="p">
                View app performance metrics and analytics.
              </Typography>
              <Button variant="contained" color="primary" style={styles.button}>
                View Metrics
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
});

export default SuperAdminAnalyticsReportingScreen;

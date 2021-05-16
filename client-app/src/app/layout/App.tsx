import React, { Fragment, useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComonent';
import { v4 as uuid } from 'uuid';
import { useStore } from '../stores/store.ts';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setSubmitting(true)
        if (activity.id) {
          setActivities([...activities.filter(x => x.id !== activity.id), activity])
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        }
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]) 
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() =>{
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);

    })
  
  }

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <NavBar  />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities = {activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting = {submitting}
        />
      </Container>

    </Fragment>
  );
}

export default observer(App);

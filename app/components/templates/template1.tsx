import { Resume } from '@/lib/types';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    alignContent: 'center',
    textAlign: 'center',
  },
});

export default function Template1({ resume }: { resume: Resume | undefined }) {
  // const fullName = useResumeStore((state) => state.resume);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{resume?.profile?.fullName}</Text>
        </View>
      </Page>
    </Document>
  );
}

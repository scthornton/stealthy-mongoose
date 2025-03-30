
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash, Calendar, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";

/**
 * Interface for schedule frequency options
 * @interface ScheduleFrequency
 */
interface ScheduleFrequency {
  value: string;
  label: string;
}

/**
 * Available schedule frequency options
 */
const FREQUENCY_OPTIONS: ScheduleFrequency[] = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" }
];

/**
 * Interface for scheduled scan data structure
 * @interface ScheduledScan
 */
interface ScheduledScan {
  id: string;
  name: string;
  target: string;
  portRange: string;
  frequency: string;
  nextRun: string;
  active: boolean;
}

/**
 * Sample scheduled scans for demonstration purposes
 * In a real implementation, these would be stored in a database or local storage
 */
const SAMPLE_SCHEDULED_SCANS: ScheduledScan[] = [
  {
    id: "schedule-1",
    name: "Daily Network Check",
    target: "192.168.1.0/24",
    portRange: "20-25,80,443,3389",
    frequency: "daily",
    nextRun: "2023-07-18 03:00:00",
    active: true
  },
  {
    id: "schedule-2",
    name: "Weekly Full Scan",
    target: "192.168.1.0/24",
    portRange: "1-10000",
    frequency: "weekly",
    nextRun: "2023-07-23 02:00:00",
    active: true
  },
  {
    id: "schedule-3",
    name: "Hourly Critical Services",
    target: "192.168.5.68",
    portRange: "22,80,443,3306",
    frequency: "hourly",
    nextRun: "2023-07-17 15:00:00",
    active: false
  }
];

/**
 * Component for managing scheduled scans
 * 
 * This component allows users to:
 * - Create scan schedules for automated scanning
 * - Edit existing schedules
 * - Enable/disable schedules
 * - Delete schedules
 * 
 * @returns {JSX.Element} A card with scheduled scans management interface
 */
const ScheduledScans = () => {
  const [schedules, setSchedules] = useState<ScheduledScan[]>(SAMPLE_SCHEDULED_SCANS);
  const [editingSchedule, setEditingSchedule] = useState<ScheduledScan | null>(null);
  const [newSchedule, setNewSchedule] = useState<Omit<ScheduledScan, "id" | "nextRun">>({
    name: "",
    target: "",
    portRange: "1-1000",
    frequency: "daily",
    active: true
  });

  /**
   * Gets formatted display for frequency
   * @param {string} frequencyValue - The frequency value
   * @returns {string} Human-readable frequency label
   */
  const getFrequencyLabel = (frequencyValue: string): string => {
    return FREQUENCY_OPTIONS.find(option => option.value === frequencyValue)?.label || frequencyValue;
  };

  /**
   * Calculates next run time based on frequency
   * In a real implementation, this would use proper date/time calculations
   * @param {string} frequency - Frequency of the scheduled scan
   * @returns {string} The next run time as a string
   */
  const calculateNextRun = (frequency: string): string => {
    const now = new Date();
    let nextRun = new Date(now);
    
    switch (frequency) {
      case "hourly":
        nextRun.setHours(nextRun.getHours() + 1);
        break;
      case "daily":
        nextRun.setDate(nextRun.getDate() + 1);
        break;
      case "weekly":
        nextRun.setDate(nextRun.getDate() + 7);
        break;
      case "monthly":
        nextRun.setMonth(nextRun.getMonth() + 1);
        break;
      default:
        break;
    }
    
    return nextRun.toISOString().replace("T", " ").substring(0, 19);
  };

  /**
   * Handles creation of a new scheduled scan
   */
  const handleCreateSchedule = () => {
    const schedule = {
      ...newSchedule,
      id: `schedule-${Date.now()}`,
      nextRun: calculateNextRun(newSchedule.frequency)
    };
    
    setSchedules([...schedules, schedule]);
    setNewSchedule({
      name: "",
      target: "",
      portRange: "1-1000",
      frequency: "daily",
      active: true
    });
  };

  /**
   * Handles updating an existing scheduled scan
   */
  const handleUpdateSchedule = () => {
    if (!editingSchedule) return;
    
    // Recalculate next run if frequency changed
    const updatedSchedule = {
      ...editingSchedule,
      nextRun: calculateNextRun(editingSchedule.frequency)
    };
    
    setSchedules(schedules.map(schedule => 
      schedule.id === updatedSchedule.id ? updatedSchedule : schedule
    ));
    
    setEditingSchedule(null);
  };

  /**
   * Handles toggling the active state of a scheduled scan
   * @param {string} id - ID of the schedule to toggle
   */
  const handleToggleActive = (id: string) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id ? { ...schedule, active: !schedule.active } : schedule
    ));
  };

  /**
   * Handles deletion of a scheduled scan
   * @param {string} id - ID of the schedule to delete
   */
  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-white">Scheduled Scans</CardTitle>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Create Scheduled Scan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Schedule Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Daily Network Check"
                  value={newSchedule.name}
                  onChange={(e) => setNewSchedule({...newSchedule, name: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target IP/Network</Label>
                <Input
                  id="target"
                  placeholder="e.g., 192.168.1.0/24"
                  value={newSchedule.target}
                  onChange={(e) => setNewSchedule({...newSchedule, target: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portRange">Port Range</Label>
                <Input
                  id="portRange"
                  placeholder="e.g., 1-1000 or 22,80,443"
                  value={newSchedule.portRange}
                  onChange={(e) => setNewSchedule({...newSchedule, portRange: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={newSchedule.frequency}
                  onValueChange={(value) => setNewSchedule({...newSchedule, frequency: value})}
                >
                  <SelectTrigger id="frequency" className="bg-gray-700 border-gray-600 text-gray-200">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-gray-200">
                    {FREQUENCY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newSchedule.active}
                  onCheckedChange={(checked) => setNewSchedule({...newSchedule, active: checked})}
                />
                <Label htmlFor="active">Enable Schedule</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleCreateSchedule} className="bg-red-600 hover:bg-red-700">
                  Create Schedule
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-700">
          <Table>
            <TableHeader className="bg-gray-700">
              <TableRow>
                <TableHead className="text-gray-200">Name</TableHead>
                <TableHead className="text-gray-200">Target</TableHead>
                <TableHead className="text-gray-200">Port Range</TableHead>
                <TableHead className="text-gray-200">Frequency</TableHead>
                <TableHead className="text-gray-200">Next Run</TableHead>
                <TableHead className="text-gray-200">Status</TableHead>
                <TableHead className="text-gray-200 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id} className="bg-gray-800 border-b border-gray-700">
                  <TableCell className="font-medium text-gray-300">{schedule.name}</TableCell>
                  <TableCell className="font-mono text-gray-300">{schedule.target}</TableCell>
                  <TableCell className="text-gray-300">{schedule.portRange}</TableCell>
                  <TableCell className="text-gray-300">{getFrequencyLabel(schedule.frequency)}</TableCell>
                  <TableCell className="text-gray-300">{schedule.nextRun}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full mr-2 ${
                          schedule.active ? "bg-green-500" : "bg-gray-500"
                        }`}
                      />
                      <span className="text-gray-300">
                        {schedule.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingSchedule({...schedule})}
                            title="Edit schedule"
                          >
                            <Edit className="h-4 w-4 text-blue-400" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-800 text-white border-gray-700">
                          <DialogHeader>
                            <DialogTitle>Edit Schedule</DialogTitle>
                          </DialogHeader>
                          {editingSchedule && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Schedule Name</Label>
                                <Input
                                  id="edit-name"
                                  value={editingSchedule.name}
                                  onChange={(e) => setEditingSchedule({...editingSchedule, name: e.target.value})}
                                  className="bg-gray-700 border-gray-600 text-gray-200"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-target">Target IP/Network</Label>
                                <Input
                                  id="edit-target"
                                  value={editingSchedule.target}
                                  onChange={(e) => setEditingSchedule({...editingSchedule, target: e.target.value})}
                                  className="bg-gray-700 border-gray-600 text-gray-200"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-portRange">Port Range</Label>
                                <Input
                                  id="edit-portRange"
                                  value={editingSchedule.portRange}
                                  onChange={(e) => setEditingSchedule({...editingSchedule, portRange: e.target.value})}
                                  className="bg-gray-700 border-gray-600 text-gray-200"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-frequency">Frequency</Label>
                                <Select
                                  value={editingSchedule.frequency}
                                  onValueChange={(value) => setEditingSchedule({...editingSchedule, frequency: value})}
                                >
                                  <SelectTrigger id="edit-frequency" className="bg-gray-700 border-gray-600 text-gray-200">
                                    <SelectValue placeholder="Select frequency" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-700 border-gray-600 text-gray-200">
                                    {FREQUENCY_OPTIONS.map((option) => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="edit-active"
                                  checked={editingSchedule.active}
                                  onCheckedChange={(checked) => setEditingSchedule({...editingSchedule, active: checked})}
                                />
                                <Label htmlFor="edit-active">Enable Schedule</Label>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button onClick={handleUpdateSchedule} className="bg-red-600 hover:bg-red-700">
                                Update Schedule
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleActive(schedule.id)}
                        title={schedule.active ? "Disable schedule" : "Enable schedule"}
                      >
                        <Clock className={`h-4 w-4 ${schedule.active ? "text-yellow-400" : "text-green-400"}`} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        title="Delete schedule"
                      >
                        <Trash className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {schedules.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-400">
                    No scheduled scans configured
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-3 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-yellow-300 text-sm">
              Scheduled scans are simulated in this demo application. In a production environment, 
              these would be executed by a background service or cron job that periodically runs 
              scans based on the configured schedules.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledScans;

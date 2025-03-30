
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Plus, Edit, Trash, Play } from "lucide-react";
import { Label } from "@/components/ui/label";

/**
 * Interface for scan profile data structure
 * @interface ScanProfile
 */
interface ScanProfile {
  id: string;
  name: string;
  target: string;
  portRange: string;
  threads: number;
  timeout: number;
}

/**
 * Sample scan profiles for demonstration purposes
 * In a real implementation, these would be stored in a database or local storage
 */
const SAMPLE_PROFILES: ScanProfile[] = [
  {
    id: "profile-1",
    name: "Quick Scan",
    target: "",
    portRange: "1-1000",
    threads: 100,
    timeout: 1.0
  },
  {
    id: "profile-2",
    name: "Thorough Scan",
    target: "",
    portRange: "1-10000",
    threads: 50,
    timeout: 2.0
  },
  {
    id: "profile-3",
    name: "Common Services",
    target: "",
    portRange: "20-25,53,80,443,3306,3389,5432,8080",
    threads: 100,
    timeout: 1.0
  }
];

/**
 * Interface for the scan profiles component props
 * @interface ScanProfilesProps
 */
interface ScanProfilesProps {
  onSelectProfile: (profile: ScanProfile) => void;
}

/**
 * Component for managing and selecting scan profiles
 * 
 * This component allows users to:
 * - Create predefined scan configurations (profiles)
 * - Edit existing profiles
 * - Delete profiles
 * - Select a profile to use for scanning
 * 
 * @param {ScanProfilesProps} props - Component props
 * @returns {JSX.Element} A card with scan profile management interface
 */
const ScanProfiles = ({ onSelectProfile }: ScanProfilesProps) => {
  const [profiles, setProfiles] = useState<ScanProfile[]>(SAMPLE_PROFILES);
  const [editingProfile, setEditingProfile] = useState<ScanProfile | null>(null);
  const [newProfile, setNewProfile] = useState<Omit<ScanProfile, "id">>({
    name: "",
    target: "",
    portRange: "1-1000",
    threads: 100,
    timeout: 1.0
  });

  /**
   * Handles creation of a new scan profile
   */
  const handleCreateProfile = () => {
    const profile = {
      ...newProfile,
      id: `profile-${Date.now()}`
    };
    
    setProfiles([...profiles, profile]);
    setNewProfile({
      name: "",
      target: "",
      portRange: "1-1000",
      threads: 100,
      timeout: 1.0
    });
  };

  /**
   * Handles updating an existing scan profile
   */
  const handleUpdateProfile = () => {
    if (!editingProfile) return;
    
    setProfiles(profiles.map(profile => 
      profile.id === editingProfile.id ? editingProfile : profile
    ));
    
    setEditingProfile(null);
  };

  /**
   * Handles deletion of a scan profile
   * @param {string} id - ID of the profile to delete
   */
  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  /**
   * Handles selecting a profile for scanning
   * @param {ScanProfile} profile - The profile to use for scanning
   */
  const handleSelectProfile = (profile: ScanProfile) => {
    onSelectProfile(profile);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-white">Scan Profiles</CardTitle>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Create Scan Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Profile Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Quick Scan"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile({...newProfile, name: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Default Target (optional)</Label>
                <Input
                  id="target"
                  placeholder="e.g., 192.168.1.1"
                  value={newProfile.target}
                  onChange={(e) => setNewProfile({...newProfile, target: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portRange">Port Range</Label>
                <Input
                  id="portRange"
                  placeholder="e.g., 1-1000"
                  value={newProfile.portRange}
                  onChange={(e) => setNewProfile({...newProfile, portRange: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-gray-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threads">Threads</Label>
                  <Input
                    id="threads"
                    type="number"
                    value={newProfile.threads}
                    onChange={(e) => setNewProfile({...newProfile, threads: parseInt(e.target.value)})}
                    className="bg-gray-700 border-gray-600 text-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeout">Timeout (s)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    step="0.1"
                    value={newProfile.timeout}
                    onChange={(e) => setNewProfile({...newProfile, timeout: parseFloat(e.target.value)})}
                    className="bg-gray-700 border-gray-600 text-gray-200"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleCreateProfile} className="bg-red-600 hover:bg-red-700">
                  Create Profile
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
                <TableHead className="text-gray-200">Port Range</TableHead>
                <TableHead className="text-gray-200">Threads</TableHead>
                <TableHead className="text-gray-200">Timeout</TableHead>
                <TableHead className="text-gray-200 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id} className="bg-gray-800 border-b border-gray-700">
                  <TableCell className="font-medium text-gray-300">{profile.name}</TableCell>
                  <TableCell className="text-gray-300">{profile.portRange}</TableCell>
                  <TableCell className="text-gray-300">{profile.threads}</TableCell>
                  <TableCell className="text-gray-300">{profile.timeout}s</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSelectProfile(profile)}
                        title="Use this profile"
                      >
                        <Play className="h-4 w-4 text-green-400" />
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingProfile({...profile})}
                            title="Edit profile"
                          >
                            <Edit className="h-4 w-4 text-blue-400" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-800 text-white border-gray-700">
                          <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                          </DialogHeader>
                          {editingProfile && (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Profile Name</Label>
                                <Input
                                  id="edit-name"
                                  value={editingProfile.name}
                                  onChange={(e) => setEditingProfile({...editingProfile, name: e.target.value})}
                                  className="bg-gray-700 border-gray-600 text-gray-200"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-target">Default Target (optional)</Label>
                                <Input
                                  id="edit-target"
                                  value={editingProfile.target}
                                  onChange={(e) => setEditingProfile({...editingProfile, target: e.target.value})}
                                  className="bg-gray-700 border-gray-600 text-gray-200"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-portRange">Port Range</Label>
                                <Input
                                  id="edit-portRange"
                                  value={editingProfile.portRange}
                                  onChange={(e) => setEditingProfile({...editingProfile, portRange: e.target.value})}
                                  className="bg-gray-700 border-gray-600 text-gray-200"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-threads">Threads</Label>
                                  <Input
                                    id="edit-threads"
                                    type="number"
                                    value={editingProfile.threads}
                                    onChange={(e) => setEditingProfile({...editingProfile, threads: parseInt(e.target.value)})}
                                    className="bg-gray-700 border-gray-600 text-gray-200"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-timeout">Timeout (s)</Label>
                                  <Input
                                    id="edit-timeout"
                                    type="number"
                                    step="0.1"
                                    value={editingProfile.timeout}
                                    onChange={(e) => setEditingProfile({...editingProfile, timeout: parseFloat(e.target.value)})}
                                    className="bg-gray-700 border-gray-600 text-gray-200"
                                  />
                                </div>
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
                              <Button onClick={handleUpdateProfile} className="bg-red-600 hover:bg-red-700">
                                Update Profile
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProfile(profile.id)}
                        title="Delete profile"
                      >
                        <Trash className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScanProfiles;

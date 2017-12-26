---
title: "My storage server setup"
header: "My storage server setup"
long_title: "My storage server setup"
pub_date: 2017-12-28
lang: en
---

Recently I announced on Twitter some upgrade I did on a "home" server:

{% twitter https://twitter.com/larsr_h/status/944880173308170241 %}

Shortly thereafter, someone wanted to know what the setup looks like:

{% twitter https://twitter.com/lunaryorn/status/944921200043622400 %}

So, I took some time to describe the hardware & software on the machines (I have an almost identical setup at two different locations).

### Hardware

The base hardware is an [HP ProLiant N40L](http://n40l.wikia.com).[^1]
This is a cute little cube with a rather slow, but sufficient CPU (AMD Neo, 1.5 GHz).
This model is already some years old: it is from Gen 7 with dual-core AMD CPUs, whereas the latest model as of writing is a Gen 10 with dual-core Opteron.
Unfortunately, the N40L Wikia only covers Gen 7 and Gen 8, but you should be able to find ample information on the newer models on the web as well, since there's an active user base.
It is also possible to upgrade the RAM (unbuffered ECC) in these devices, because they have two slots with only one used.

The basic setup of these devices is unchanged:
Four SATA HDD slots (not hot-plug, but easily removable enclosure bays), one SATA ODD slot (not hot-plug, not easily replacable), two PCIe slots (low profile), and a ton of USB ports.
Details might vary over generations, but it should be possible to put a fifth disk into the ODD slot, although not all models will be able to boot from this.
For booting, you can also use an external USB drive.
Most models have an "internal external" USB port on the mainboard with enough space for a USB pen.

My N40L however can boot from the ODD slot, so I put four large drives (3 TB, WD Red) in there, and moved the included system HDD (some sub-TB model from Seagate) to the ODD slot.
That required some mechanical fiddling:
I used a 3.5"-in-5.25" vibe fixer from Sharkoon, which works pretty well.
If I were to re-setup the machine today, I would probably put four even larger drives (6 TB, WD Red) in there.

Additionally, I recently installed an external SATA enclosure (Icy Box) for two disks.
I put four 6 TB WD Red disks in there.
The external enclosure has RAID functionality, but I don't use it.
It offers eSATA and USB 3 ports, but because I wasn't sure whether the N40L supported SATA port multiplier, I instead installed a USB 3 PCIe card into the cube and used that.
The disadvantage of that is that `smartctl` will probably never be able to get detailed S.M.A.R.T. data out of the USB-SATA controller.

Most of the disks (12 in total) are WD Red.
For historic reasons (WD Red wasn't available) there are still two WD Green in the N36L cube; the other two have failed already.
I've also replaced one of the WD Reds before it filed, because S.M.A.R.T. was reporting a few bad blocks.

If you're considering buying a ProLiant Microserver, be prepared to fiddle around a bit.
Their nicely compact form is convenient for placing them on a physical desk, but apart from swapping disks into and out of the bays, every hardware operation is a bit tricky.
I hear that some people have put a graphics card in there to enable HD video playback.
However, I can't really say how well that works.
Make sure to read the relevant forum threads before you buy anything.

### Partitioning

The four big internal disks are formatted with a DOS partition table and combined using Linux' own dm-raid to a software RAID 5.
This creates a big volume of approximately 9 TB, which I've formatted with btrfs.
The fifth small internal disk has no special setup, just a DOS partition table and a bunch of ext4 partitions.

The two big external disks are formatted with GPT, combined to a software RAID 1, also formatted with btrfs.
The resulting volume of approximately 6 TB.

Between the RAID and btrfs, there's dm-crypt for full-disk encryption layered in between.
The performance is not great, but sufficient for NAS purposes.
Below is the output of `cryptsetup benchmark` for, in order: the N36L cube, the N40L cube, and for reference, my laptop (a quad-core i7-6920HQ at 2.9 GHz).

```
# N36L
#  Algorithm | Key |  Encryption |  Decryption
     aes-cbc   128b    59.4 MiB/s    69.4 MiB/s
 serpent-cbc   128b    27.0 MiB/s    42.1 MiB/s
 twofish-cbc   128b    62.7 MiB/s    67.1 MiB/s
     aes-cbc   256b    48.7 MiB/s    52.6 MiB/s
 serpent-cbc   256b    28.9 MiB/s    41.9 MiB/s
 twofish-cbc   256b    63.2 MiB/s    67.1 MiB/s
     aes-xts   256b    64.2 MiB/s    67.6 MiB/s
 serpent-xts   256b    37.8 MiB/s    38.6 MiB/s
 twofish-xts   256b    65.3 MiB/s    64.8 MiB/s
     aes-xts   512b    50.1 MiB/s    50.7 MiB/s
 serpent-xts   512b    38.1 MiB/s    38.7 MiB/s
 twofish-xts   512b    65.2 MiB/s    64.7 MiB/s

# N40L
#  Algorithm | Key |  Encryption |  Decryption
     aes-cbc   128b   129.8 MiB/s   144.2 MiB/s
 serpent-cbc   128b    52.4 MiB/s   141.9 MiB/s
 twofish-cbc   128b   125.9 MiB/s   154.3 MiB/s
     aes-cbc   256b   106.8 MiB/s   114.7 MiB/s
 serpent-cbc   256b    56.8 MiB/s   141.7 MiB/s
 twofish-cbc   256b   125.7 MiB/s   154.5 MiB/s
     aes-xts   256b   135.3 MiB/s   140.0 MiB/s
 serpent-xts   256b   125.1 MiB/s   128.2 MiB/s
 twofish-xts   256b   138.2 MiB/s   137.7 MiB/s
     aes-xts   512b   108.8 MiB/s   109.0 MiB/s
 serpent-xts   512b   126.5 MiB/s   128.3 MiB/s
 twofish-xts   512b   138.4 MiB/s   139.0 MiB/s

# i7-6920HQ
#  Algorithm | Key |  Encryption |  Decryption
     aes-cbc   128b  1061.8 MiB/s  3371.5 MiB/s
 serpent-cbc   128b    86.7 MiB/s   675.5 MiB/s
 twofish-cbc   128b   201.4 MiB/s   377.1 MiB/s
     aes-cbc   256b   810.2 MiB/s  2685.9 MiB/s
 serpent-cbc   256b    90.7 MiB/s   686.1 MiB/s
 twofish-cbc   256b   204.4 MiB/s   376.2 MiB/s
     aes-xts   256b  3377.4 MiB/s  3321.2 MiB/s
 serpent-xts   256b   653.8 MiB/s   648.6 MiB/s
 twofish-xts   256b   360.0 MiB/s   346.5 MiB/s
     aes-xts   512b  2650.4 MiB/s  2588.9 MiB/s
 serpent-xts   512b   663.4 MiB/s   667.6 MiB/s
 twofish-xts   512b   341.6 MiB/s   357.8 MiB/s
```

I expect the Gen 10 devices to be much faster than my cubes on crypto operations, though.

I only recently discovered `lsblk`, which is a handy tool for displaying a hierarchical view of the block devices, partitions, RAID and crypto volumes.
Here's an excerpt from the external disks:

```
NAME            MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
sda               8:0    0   5.5T  0 disk
└─sda1            8:1    0   5.5T  0 part
  └─md1           9:1    0   5.5T  0 raid1
    └─icy-crypt 253:0    0   5.5T  0 crypt /mnt/icy
sdb               8:16   0   5.5T  0 disk
└─sdb1            8:17   0   5.5T  0 part
  └─md1           9:1    0   5.5T  0 raid1
    └─icy-crypt 253:0    0   5.5T  0 crypt /mnt/icy
```

Setting these partitions up was a matter of mere minutes.
There are only two things I prepared:

1. I bought the disks from multiple different vendors at different times, to increase the chances that I have disks from different batches running at the same time.
   This should in turn decrease the chances of them failing at the same time.
2. When creating the RAID partitions on the raw disks, I did some quick calculations to make them a couple of MB smaller than the physical size.
   With recent `fdisk` and `gdisk` versions, this is easier, but back in the day when I created the RAID5 volume, I had to also make sure that the partition is aligned properly (at 4 MB boundaries).

## Software

Both cubes run Debian, which I slightly prefer over Ubuntu.
One of them also runs some intranet applications backed by PostgreSQL.
The actual OS installation and all the software has been done manually; in the future, I may want to put that into VCS and use Ansible to bootstrap the system.
Also, I want to convert the system partitions from ext4 to btrfs because it supports snapshotting.

The storage volumes are already on btrfs, segmented into multiple subvolumes with different archival strategies.
Snapshotting is important because some Windows clients are accessing the NAS via SMB, so any "infection" might destroy vital data on the NAS as well.
Hence, I use [btrbk](https://github.com/digint/btrbk) to create automated daily snapshots.
Here's an excerpt from the configuration:

```
volume /mnt/storage
        subvolume archive
                snapshot_name btrbk
                snapshot_dir .snapshots/archive
                snapshot_preserve_min 7d
                snapshot_preserve 4w 12m
        subvolume backup
                snapshot_name btrbk
                snapshot_dir .snapshots/backup
                snapshot_preserve_min 7d
                snapshot_preserve 4w 12m
        subvolume mail
                snapshot_name btrbk
                snapshot_dir .snapshots/mail
                snapshot_preserve_min 7d
                snapshot_preserve 4w 12m
        subvolume share
                snapshot_name btrbk
                snapshot_dir .snapshots/share
                snapshot_preserve_min 28d
                snapshot_preserve 8w 3m
```

For example, the subvolume `archive` gets snapshotted daily; daily snapshots are retained for at least seven days; weekly snapshots are retained for four weeks; monthly snapshots are retained for a year.
This will hopefully explain (partly) why I need so much storage:
I essentially keep a full filesystem for about a year.
In case there's an infection that deletes or encrypts data, I can just rollback from the last read-only snapshot.

## Backups

A variety of clients with a variety of software back up data on the cubes.
On my Linux clients I use plain and simple `rsync` with `--link-dest` to create "faux" incremental backups.
On Windows clients, the built-in backup does a good-enough job, although Windows 10 is exhibiting problems with backups on SMB drives (replacement pending).

For offsite backups, I don't claim to have a perfect solution.
Currently, I use [Unison](https://www.cis.upenn.edu/~bcpierce/unison/) to semi-automatically transfer 1:1 copies of some subvolumes.
The advantage is that I get to see a summary of changes and can check for accidentally deleted files.
I would like to migrate this to a mixed `rsync` and `unison` solution that uses the former for data that changes frequently (e.g. backups) and the latter for data that changes rarely (e.g. my photo collection).

The cube itself is backed up only partially.
Some parts, like maildirs, are synced to the other location with Unison.
Others, like configuration, are not backed up at all.
But I am currently in the process of setting up [Duplicati 2](https://www.duplicati.com/), which offers a convenient web interface.[^2]

[^1]: The other location has an earlier model, N36L.
[^2]: Do not construe this as a recommendation of Duplicati. Research backup software yourself.
